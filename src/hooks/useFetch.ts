import { useCallback, useContext, useState } from "react";
import authorize from "../authorize/Authorize";
import { TFetchState } from "../types/types";
import { AppContext, IAppContext } from "../contexts/AppContext/AppContext";
import { base_api_url, ENDPOINTS } from "../api";

export type TRequestConfig = {
	method?: string;
	headers?: any;
	body?: any;
}

export default function useFetch() {
	const [fetchState, setFetchState] = useState<TFetchState>("notFired");
	const appContext = useContext(AppContext);

	let timer: any = null;

	let controller: AbortController;

	const doFetch = useCallback(async (
		apiKey: keyof typeof ENDPOINTS | string,
		paths: Array<string>,
		query: Array<[string, string]>,
		callback: Function,
		config: TRequestConfig = { method: 'GET' }
	) => {

		if (controller) {
			controller.abort();
		}

		controller = new AbortController();

		let body_str = null;
		if (config.body) {
			body_str = JSON.stringify(config.body);
		};
		try {
			setFetchState("waiting");
			let url: string;
			//@ts-ignore
			const api = ENDPOINTS[apiKey];
			url = api ? createApiUrl(apiKey as keyof typeof ENDPOINTS, paths, query) : apiKey;
			const response = await fetch(url, {
				signal: controller.signal,
				method: config.method,
				headers: {
					...config.headers,
					'Authorization': `Bearer ${authorize.token}`,
					'Battlenet-Namespace': appContext.namespace + appContext.region
				},
				body: body_str
			});
			if (response.ok) {
				const data = await response.json();
				setFetchState("success");
				callback(data);
			} else {
				setFetchState("error");
				// throw new Error("something went wrong.");
			};
		} catch (e: any) {
			setFetchState("error");
			// throw new Error(e.toString());
		};
		resetState();
	}, [appContext]);

	const createApiUrl = useCallback((baseApiKey: keyof typeof ENDPOINTS, paths: Array<string>, query: Array<[string, string]>): string => {
		let result = base_api_url + ENDPOINTS[baseApiKey];
		result += paths.map(path => {
			return `${path}`;
		}).join("/");
		if (query && query.length > 0) {
			result += "?";
			result += query.map(entry => {
				const regex = /\{([^}]+)\}/g;
				let value: string | keyof IAppContext | undefined = regex.exec(entry[0])?.[0];
				value = value?.substring(1, value.length-1);
				//@ts-ignore
				entry[0] = entry[0].replace(regex, appContext[value]);
				return `${entry[0]}=${entry[1]}`;
			}).join("&");
		}
		return result;
	}, [appContext]);

	function resetState() {
		if (timer !== null) {
			clearTimeout(timer);
		};
		timer = setTimeout(() => {
			setFetchState("notFired");
		}, 5000);
	};

	return [doFetch, fetchState] as const;
};
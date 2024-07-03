export const useCreateApiUrl = () => {
	// const [url, setUrl] = useState<string>("");
	// const appContext = useContext(AppContext);


	// const createApiUrl = useCallback((basePathKey: keyof typeof paths, q: Array<[string, string]> | undefined): string => {
	// 	let result = base_api_url + paths[basePathKey];
	// 	if (q && q.length > 0) {
	// 		result += "?";
	// 		result = result + q?.map(entry => {
	// 			const regex = /\{([^}]+)\}/g;
	// 			let value: string | keyof IAppContext | undefined = regex.exec(entry[0])?.[0];
	// 			value = value?.substring(1, value.length-1);
	// 			//@ts-ignore
	// 			value && Object.hasOwn(appContext, value) && entry[0].replace(regex, appContext[value])
	// 			return `${entry[0]}=${entry[1]}`
	// 		}).join("&");
	// 	}
	// 	return result;
	// }, [appContext]);

	// return [createApiUrl] as const;
}
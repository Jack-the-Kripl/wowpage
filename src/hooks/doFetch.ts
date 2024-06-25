import { api_namespace } from "../api";
import authorize from "../authorize/Authorize";

type TRequestConfig = {
    method?: string;
    headers?: any;
    body?: any;
}

// export default function useFetch() {
// const [data, setData] = useState<any>(null);

export default async function doFetch(
    url: string,
    callback: Function,
    config: TRequestConfig = { method: 'GET' }
) {
    let body_str = null;
    if (config.body) {
        body_str = JSON.stringify(config.body);
    }
    try {
        const response = await fetch(url, {
            method: config.method,
            headers: {
                ...config.headers,
                'Authorization': `Bearer ${authorize.token}`,
                'Battlenet-Namespace': api_namespace
            },
            body: body_str
        });
        if (response.ok) {
            const data = await response.json();
            callback(data);
        } else {
            throw new Error("something went wrong.");
        }
    } catch (e: any) {
        throw new Error(e.toString());
    }
};

//     return doFetch;
// }
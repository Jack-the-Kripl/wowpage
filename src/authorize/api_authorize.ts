import { client_id, client_secret, token_api_url } from "../api";

export type TTokenResponse = { "access_token": string, "token_type": string, "expires_in": number, "sub": string }

export async function generate_token() {
    try {
        const response = await fetch(token_api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'grant_type': 'client_credentials',
                'client_id': client_id,
                'client_secret': client_secret,
            })
        });
        if (response.ok) {
            const data: TTokenResponse = await response.json();
            return data;
        } else {
            throw new Error("Something happened");
        }
    } catch (e) {
        console.log(e);
        throw new Error("Something happened");
    }

}
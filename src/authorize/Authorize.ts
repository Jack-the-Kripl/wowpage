import { TTokenResponse, generate_token } from "./api_authorize";

class Authorize {
    private __token_data: TTokenResponse = {} as TTokenResponse;

    constructor() {
        this.get_new_token();
    }

    get token() {
        if (!this.token_is_valid()) {
            this.get_new_token();
        }
        
        return this.__token_data.access_token;
    }

    get_new_token() {
        generate_token().then(data => {
            this.__token_data = data;
        }).catch(e => {
            console.log(e);
            this.__token_data = {} as TTokenResponse;
        });
    }

    token_is_valid(): boolean {
        return true;
    }
}
const authorize = new Authorize();
export default authorize;
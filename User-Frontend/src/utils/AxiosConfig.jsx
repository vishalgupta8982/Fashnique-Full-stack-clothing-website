 import { getTokenFromLocalStorage } from "./Token"
export const config = {
    headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token.token : ''}`,
    },
}

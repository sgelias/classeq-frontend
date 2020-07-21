import { authConstants } from './auth.constants';


export function auth(state = {}, action: any) {
    switch (action.type) {

        case authConstants.GETALL_REQUEST:
            return {
                loading: true
            };

        case authConstants.GETALL_SUCCESS:
            return {
                items: action.users
            };

        case authConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        default:
            return state
    }
}

import { authConstants } from './auth.constants';
import { authService as as } from '../_services/_auth.services';
import { User } from '../../../_helpers/url-providers';


let user: User = as.getToken();


const initialState = user ? { loggedIn: true, user } : {};


const auth = (state = initialState, action: any) => {
  switch (action.type) {

    case authConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };

    case authConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };

    case authConstants.LOGIN_FAILURE:
      return {};

    case authConstants.LOGOUT:
      return {};

    default:
      return state
  }
}


export default auth;
import { combineReducers } from 'redux';

import navigationReducer from './screens/App/shared/components/Navbar/reducers/reducers';


export default combineReducers({
    //errorMessage: exceptionReducer,
    navigation: navigationReducer,
});

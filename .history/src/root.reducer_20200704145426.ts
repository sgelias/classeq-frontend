import { combineReducers } from 'redux';

import navigationReducer from './screens/App/shared/components/Navbar/reducers/reducer';


export default combineReducers({
    //errorMessage: exceptionReducer,
    navigation: navigationReducer,
});

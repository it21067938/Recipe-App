import { authConstants } from "../Action/constants";
 
const initState = {
    loading: false,
    authenticated: false,
    user: {}
}
 //state manage
export default (state = initState, action) => {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                loading: true,
                authenticated: false
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                loading: false,
                authenticated: true,
                user: action.payload.user
            }
            break;
        case authConstants.LOGIN_FALIURE:
            state = {
                ...state,
                loading: false,
                authenticated: false
            }
            break;
        case authConstants.REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case authConstants.REGISTER_FALIURE:
            state = {
                ...state,
                loading: false
            }
            break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initState
            }
            break;
        case authConstants.LOGOUT_FALIURE:
            state = {
                ...state,
                loading: false
            }
            break;
 
    }
    return state;
}
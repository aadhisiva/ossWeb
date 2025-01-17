import { CLEAR_TIMEOUT_ID, LOGGED_IN, LOGGED_OUT, OTP_VERIFY, SET_TIMEOUT_ID } from "../../utilities/constants";

const initialState = {
    isLoggedIn: false,
    Otp : null,
    Mobile: "",
    userCodes: [],
    userRole: ""
};

export const userReducers = (state = initialState, action: any) => {
    const { payload } = action;
    switch (action.type) {
        case SET_TIMEOUT_ID:
            return { ...state, timeoutId: payload };
        case LOGGED_IN:
            return { ...state, Mobile: payload.Mobile, Otp: payload.Otp };
        case LOGGED_OUT:
            return initialState;
        case OTP_VERIFY:
            return { ...state, isLoggedIn: true, userRole: payload?.userRole, userCodes: payload?.userCodes};
        case CLEAR_TIMEOUT_ID:
            return initialState;
        default:
            return state;
    }
};
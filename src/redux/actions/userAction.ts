import { LOGGED_IN, LOGGED_OUT, OTP_VERIFY, ROLE_ACCESS } from "../../utilities/constants"

export const userLoggedIn = (data: any) => {
    return {
        type: LOGGED_IN,
        payload: data
    }
};

export const userLoggedOut = () => {
    return {
        type: LOGGED_OUT
    }
}
export const otpVerification = (data: any) => {
    return {
        type: OTP_VERIFY,
        payload: data
    };
};

export const saveUserRolesAndAccess = (data: any) => {
    return {
        type: ROLE_ACCESS,
        payload: data
    };
};

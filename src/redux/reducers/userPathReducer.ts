import { SAVE_USER_PATH } from "../../utilities/constants";

const initialState = {
    currentPath: ""
};

export const saveuserPathReducer = (state = initialState, action: any) => {
    const { payload } = action;
    switch (action.type) {
        case SAVE_USER_PATH:
            return { ...state, currentPath: payload };
        default:
            return state;
    }
};
import { SAVE_USER_PATH } from "../../utilities/constants"

export const saveuserPath = (data: string) => {
    return {
        type: SAVE_USER_PATH,
        payload: data
    }
};

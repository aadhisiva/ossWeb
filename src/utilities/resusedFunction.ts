import { postRequest } from "../Authentication/axiosrequest";

export const getDistinctOfEach = async (type: string, code: string) => {
    let res = await postRequest("getDistinctOfEach", {
        Type: type,
        Code: code
    });
    if (res?.code === 200) {
        return res.data;
    } else {
        alert(res?.response?.data?.message || "Please try again");
    }
};

export const getSubCentersFromApi = async (value: string) => {
    let res = await postRequest("getDistinctSubCenter", {
        taluk: value,
    });
    if (res?.code === 200) {
        return res.data;
    } else {
        alert("Something went wrong. Please try again");
    }
};


export const debounceFunction = (callback: any, wait: number) => {
    let timeoutId: any = null;
    return (...args:any) => {
      window.clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
  };

export function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};



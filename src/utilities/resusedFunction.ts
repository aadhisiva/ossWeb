import { postRequest } from "../Authentication/axiosrequest";
import { IMasterData } from "./interfacesOrtype";

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


export const calculatePercentage = (data: any, path: string) => {
    let sumData = (data || [])?.reduce((prev: any, next: any) => prev+ next[path], 0);
    let totalSumData = (data || [])?.reduce((prev: any, next: any) => prev+ next['TotalCount'], 0);
    const calculatedPercentage = (sumData / totalSumData) * 100;
    return calculatedPercentage.toFixed(2); 
};
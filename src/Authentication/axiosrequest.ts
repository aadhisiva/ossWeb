import axios from "axios";

const BaseUrl = "https://childrensurvey.karnataka.gov.in/mapi/admin/";
// const BaseUrl = "http://localhost:8887/mapi/admin/";

export const postRequest = async (url: string, body: any) => {
    try {
        let getData = await axios.post(BaseUrl + url, body);
        return getData.data;
    } catch (e) {
        return e;
    }
};
export const postRequestWithHeaders = async (url: string, body: any, headers: any) => {
    try {
        let getData = await axios.post(url, body, {headers: headers});
        return getData.data;
    } catch (e) {
        return e;
    }
};

export const getRequest = async (url: string, body: any) => {
    try {
        let getData = await axios.get(BaseUrl + url, body);
        return getData.data;
    } catch (e) {
        return e;
    }
};
export const PostRequestWithdownloadFile = async (url: string, body: any) => {
    try {
      const response = await axios.post(BaseUrl + url, body, {
        responseType: 'blob',
      });

      // Create a URL for the blob
      const urlOfFile = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = urlOfFile;
      link.setAttribute('download', `${body.ReqType !== "District" ? body.DistrictName+"_"+body.Type : body.TalukName}.xlsx`);

      // Append to the body and trigger click
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
    } catch (error) {
      console.error('Error downloading the file', error);
    }
  };

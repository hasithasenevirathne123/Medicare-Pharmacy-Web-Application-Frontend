import store from "../../app/store";
import axiosInstance, { setAuthHeader } from "../axios";

export const postData = async (url, data) => {
  const accessToken = store.getState().user.accessToken;

  const token = accessToken ? accessToken.key : "";
  setAuthHeader(token);

  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error making POST request:", error);
    throw error;
  }
};

export const getData = async (url) => {
  const token = store.getState().user.accessToken.key;
  console.log("Token", token);
  setAuthHeader(token);

  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error making GET request:", error);
    throw error;
  }
};

export const getFile = async (url) => {
  const token = store.getState().user.accessToken.key;
  console.log("Token", token);
  setAuthHeader(token);

  try {
    const response = await axiosInstance.get(url, { responseType: "blob" });
    return response;
  } catch (error) {
    console.error("Error fetching file:", error);
    throw error; // Rethrow the error to handle it in the caller function
  }
};

export async function getPDF(url) {
  const token = store.getState().user.accessToken.key;

  console.log(url);

  setAuthHeader(token);
  const response = await axiosInstance.get(url, {
    responseType: "blob", // Important to handle binary data
    // paramsSerializer: {
    //   encode: (param) => encodeURIComponent(param).replaceAll("%20", "A"),
    // },
  });

  return response.data;
}

export async function submitPDF(url, pdfData) {
  const token = store.getState().user.accessToken.key;
  console.log("Token", token);
  setAuthHeader(token);

  try {
    const formData = new FormData();

    formData.append("pdfFile", pdfData);

    const response = await axiosInstance.patch(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error submitting PDF:", error);
    throw error;
  }
}

export const patchData = async (url, data) => {
  const accessToken = store.getState().user.accessToken;

  const token = accessToken ? accessToken.key : "";
  setAuthHeader(token);

  try {
    const response = await axiosInstance.patch(url, data);
    return response.data;
  } catch (error) {
    console.error("Error making PATCH request:", error);
    throw error;
  }
};

export const getImage = async (url) => {
  const token = store.getState().user.accessToken.key;
  console.log("Token", token);
  setAuthHeader(token);

  try {
    const response = await axiosInstance.get(url, {
      responseType: "arraybuffer",
    });

    return response;
  } catch (error) {
    console.error("Error making GET request:", error);
    throw error;
  }
};

export const deleteData = async (url) => {
  const accessToken = store.getState().user.accessToken;

  const token = accessToken ? accessToken.key : "";
  setAuthHeader(token);

  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error making DELETE request:", error);
    throw error;
  }
};

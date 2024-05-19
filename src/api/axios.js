import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
// Function to set Authorization header
export const setAuthHeader = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
}; // Function to handle token refresh
const refreshToken = async () => {
  const dispatch = useDispatch();

  const refreshToken = useSelector((state) => state.user.refreshToken.key);
  if (refreshToken) {
    console.log("RefreshToken", refreshToken);
    try {
      const response = await axios.post(
        "http://localhost:4000/api",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      console.log("Token refreshed:", response);
      const { accessToken } = response.data;
      //localStorage.setItem("refreshToken", refreshToken);
      dispatch(setAccessToken({ key: accessToken }));
      setAuthHeader(accessToken);
      return true;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return false;
    }
  } else {
    return false;
  }
};
// Interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response:", response); // Add this line to log the response
    return response;
  },
  async (error) => {
    console.log("Error response:", error);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const tokenRefreshed = await refreshToken();
      if (tokenRefreshed) {
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

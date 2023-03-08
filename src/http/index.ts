import axios from "axios";
import { useToken } from "../store";

export const API_URL = "http://api.bigeny.ru";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  const access = useToken.getState().access;
  config.headers.Authorization = `Bearer ${access}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const setToknes = useToken.setState;
    const origRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      error.config._isRetry
    ) {
      origRequest._isRetry = true;
      try {
        const res = await axios.get(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        setToknes(res.data.AccessToken, res.data.RefreshToken);
        return $api.request(origRequest);
      } catch (e) {
        console.log(e);
      }
    }
    throw error;
  }
);

export const fetcher = (url: string) => $api.get(url).then((res) => res.data);

export default $api;

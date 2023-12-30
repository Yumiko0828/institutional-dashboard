import axios, { AxiosError } from "axios";
import { Session } from "./session";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Session.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const reqConfig = { ...err.config, _reply: false };

    if (
      err.response &&
      reqConfig.url !== "/auth/refresh" &&
      err.response.status === 401 &&
      !reqConfig._reply
    ) {
      reqConfig._reply = true;

      try {
        const { data } = await api.put("/auth/refresh", {
          token: Session.getRefreshToken(),
        });
        const { access_token, refresh_token } = data;

        Session.setAccessToken(access_token);
        Session.setRefreshToken(refresh_token);

        reqConfig.headers!.Authorization = `Bearer ${access_token}`;

        return axios(reqConfig);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 400) {
          console.error(error);
          Session.logOut();
          window.location.href = "/login";
        }

        return Promise.reject(error);
      }
    }

    return Promise.reject(err);
  }
);

export { api };

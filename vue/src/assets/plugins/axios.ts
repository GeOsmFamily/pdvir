import { DialogKey } from '@/models/enums/app/DialogKey';
import router from '@/router';
import axios, { AxiosError, type AxiosInstance } from 'axios'
import * as Sentry from '@sentry/vue';

const axiosInstance = axios.create({
  baseURL: 'https://' + import.meta.env.VITE_DOMAIN
});

axiosInstance.interceptors.response.use(undefined, (error: AxiosError) => {
  switch (error.response?.status) {
    case 401:
      router.push({ query: { ...router.currentRoute.value.query, dialog: DialogKey.AUTH_SIGN_IN } })
      break;
    case 500:
      Sentry.captureException(error);
      break;
  }
  return Promise.reject(error)
})

export const apiClient: AxiosInstance = axiosInstance;
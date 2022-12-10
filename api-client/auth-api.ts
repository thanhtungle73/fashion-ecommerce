import { UserData } from '@/models';
import axiosClient from './axios-client';

export const authApi = {
  login(payload: any) {
    return axiosClient.post('/auth/login', payload);
  },
  logout() {
    return axiosClient.post('/auth/logout');
  },
  getProfile() {
    return axiosClient.post('/auth/userProfile');
  },
  verifyCookie() {
    return axiosClient.post('/auth/verifyCookie');
  },
};

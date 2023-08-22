import { axiosInstance } from './api';

import { ContentsType } from '@/screens/Home/types';

export const fetchContentsData = async () => {
  try {
    const response = await axiosInstance.get<ContentsType[]>('contents');
    return response.data;
  } catch (error) {
    throw error;
  }
};

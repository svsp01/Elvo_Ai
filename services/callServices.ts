import axiosInstance from './api/axiosInstance';

// Fetch all users
export const initiateCall = async (id: string) => {
  const response = await axiosInstance.get('/calls');
  return response.data;
};

export const initiateBulkCalls = async (ids: string[]) =>   
  {
    const response = await axiosInstance.get('/calls/bulk', {
      params: { ids },
    });
    return response.data;
  };
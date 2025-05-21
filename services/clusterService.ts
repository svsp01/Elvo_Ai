import axiosInstance from "./api/axiosInstance"

export const clusterService = {
  searchClusters: async (query: string) => {
    const response = await axiosInstance.post('/clusters/search', { query })
    return response.data
  },

  getClusterById: async (clusterId: string) => {
    const response = await axiosInstance.get(`/clusters/${clusterId}`)
    return response.data
  }
}
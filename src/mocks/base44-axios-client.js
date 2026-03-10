// Mock @base44/sdk/dist/utils/axios-client for local development
export function createAxiosClient() {
  return {
    get: async () => ({ id: 'mock', public_settings: {} }),
    post: async () => ({}),
    put: async () => ({}),
    delete: async () => ({}),
  };
}

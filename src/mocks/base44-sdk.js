// Mock @base44/sdk for local development
import productsData from '../../data/products.json';

const mockProducts = productsData.products || [];

const createEntityProxy = () => {
  return new Proxy({}, {
    get: (target, name) => ({
      list: async () => mockProducts,
      get: async (id) => mockProducts.find(p => p.id === id) || null,
      create: async (data) => ({ id: Date.now(), ...data }),
      update: async (id, data) => ({ id, ...data }),
      delete: async () => true,
    })
  });
};

export function createClient() {
  return {
    entities: createEntityProxy(),
    auth: {
      me: async () => null,
      logout: () => {},
      redirectToLogin: () => {},
    },
    appLogs: {
      logUserInApp: async () => {},
    },
  };
}

export default { createClient };

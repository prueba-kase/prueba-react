import { QueryClient } from '@tanstack/react-query';        

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 1000 * 60 * 5,
            staleTime: 1000 * 60 * 1,
            refetchOnWindowFocus: false,
            retry: 3,
            retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
            refetchOnMount: true,
            refetchOnReconnect: true,
            onError: (error) => { console.error("Error en la consulta:", error); }
        },
        mutations: {
            onError: (error) => { console.error("Error en la mutación:", error); }
        }
    },
  });
import { createRoot }          from 'react-dom/client'
import App                     from './App.jsx'
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient }         from './utils/tanstack.js'
import './index.css'

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
)

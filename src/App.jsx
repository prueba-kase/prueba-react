import { RouterProvider }    from 'react-router-dom';
import './App.css';
import { router }            from './router/router';
import { Suspense }          from 'react';
import GlobalContextProvider from './context/global_context';

function App() {

  return(
  <GlobalContextProvider>
    <Suspense>
      <RouterProvider router={router} />;
    </Suspense>
  </GlobalContextProvider>
)}
   

export default App;

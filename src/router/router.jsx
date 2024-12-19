import { createHashRouter } from 'react-router-dom';
import { Employees, 
         EmployeeRequest, 
         Login }            from './lazyRoutes'; 
import Container            from '../containers/containers';
import LoginContainer       from '../containers/login_container'; 

export const router = createHashRouter([
  {
    path: '/login',
    element: (
      <LoginContainer>
        <Login />
      </LoginContainer>
    ),
  },
  {
    path: '/',
    element: <Container />,
    children: [
      {
        path: 'employees',
        element: <Employees />,
      },
      {
        path: 'employee-request',
        element: <EmployeeRequest />,
      },
    ],
  },
  {
    path: '*',
    element: <div className="bg-green-500 text-white p-4">No found</div>,
  },
]);


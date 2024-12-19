import { lazy } from 'react';

export const Employees = lazy(() => import('../page/employees/employees'));
export const EmployeeRequest = lazy(() => import('../page/employee_requests/employee_requests'));
export const Login = lazy(()=> import('../components/login/login_form'));

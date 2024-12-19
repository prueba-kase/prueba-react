import { Link, Outlet } from 'react-router-dom';
import useLoginRedirect from '../hooks/use_login_redirect';

export default function Container() {
  useLoginRedirect();
  return (
      <div className='flex flex-col mt-20 items-center'>
          <nav className="flex justify-between 
            items-center fixed top-0 
            z-10 w-full  py-1  text-xl 
            text-white bg-slate-800 ">
            <ul className="flex items-center gap-5 mx-5">
                <li>
                    <i>PRUEBA KASE</i>
                </li>
            </ul>
            <ul className="flex items-center gap-8 mx-8">
                <li>
                <Link to="employee-request">
                    Solicitudes
                </Link>
                </li>  
                <li>
                  <Link to="employees" className="mr-12 ">
                    Empleados
                  </Link>
                </li>           
            </ul>            
        </nav>          
        <Outlet />
      </div>
  );
}

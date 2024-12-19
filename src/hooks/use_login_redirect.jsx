import { useContext, useEffect } from 'react';
import { GlobalContext }         from '../context/global_context';
import { useNavigate }           from 'react-router-dom';

const useLoginRedirect = () => {
  const { isLogin } = useContext(GlobalContext);
  const navigate    = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin, navigate]); 
};

export default useLoginRedirect;

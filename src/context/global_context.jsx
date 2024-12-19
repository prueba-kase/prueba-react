import { createContext, 
         useState, 
         useEffect } from 'react';
import PropTypes     from 'prop-types';


export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [isLogin, setIsLogin]      = useState(false);
    const [tokenUser, setTokenUser]  = useState(null);
    const [profile, setProfile]      = useState('employee');
    const [pageEmployee, setPageEmployee] = useState('list');
    const [pageEmployeeRequest, setPageEmployeeRequest] = useState('list');
    const [listEmployee, setListEmployee] = useState([]);


    const openSession   = () => setIsLogin(true)
    const closeSession  = () => setIsLogin(false)
    const handleProfile = (param) => setProfile(param);
    const handleToken   = (param) => setTokenUser(param); 
    const handleChangePageEmployee  = (param) => setPageEmployee(param); 
    const handleChangePageEmployeeRequest  = (param) => setPageEmployeeRequest(param); 
    const handleList  = (data,type) => {
        if(type == 'employees') setListEmployee(data);
    }

    useEffect(()=>{
        sessionStorage.setItem('token',tokenUser);
    },[tokenUser])
    


    return (
        <GlobalContext.Provider value={{
            openSession,
            closeSession,
            handleProfile,
            handleToken,
            handleChangePageEmployee,
            handleChangePageEmployeeRequest,
            handleList,
            profile,
            isLogin,
            tokenUser,
            pageEmployee,
            pageEmployeeRequest,
            listEmployee
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

GlobalContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalContextProvider;

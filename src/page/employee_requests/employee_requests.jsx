import Box                      from '@mui/material/Box';
import Tab                      from '@mui/material/Tab';
import TabContext               from '@mui/lab/TabContext';
import TabList                  from '@mui/lab/TabList';
import TabPanel                 from '@mui/lab/TabPanel';
import EmployeeRequestForm      from '../../components/employee_request/employee_request_form';
import EmployeeRequestList      from '../../components/employee_request/employee_request_list';
import { useEffect,useContext } from 'react';
import { GlobalContext }        from '../../context/global_context';


const EmployeeRequest = () => {
  
    const globalContext = useContext(GlobalContext);
    const handleChange = (_, newValue) => {
      globalContext.handleChangePageEmployeeRequest(newValue)
    };
  
    useEffect(() => handleChange(false,'list'),[]);

    return (
        <Box sx={{ 
            width: '100%',
            bgcolor: 'white',
            '&:hover': {bgcolor: 'dark',}
        }}>
        <TabContext value={globalContext.pageEmployeeRequest}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} >
              <Tab label="Listar Solicitudes" value="list" />
              <Tab label="Crear Solicitudes"  value="create" />
            </TabList>
          </Box>
          <TabPanel value="list">
            <EmployeeRequestList/>
          </TabPanel>
          <TabPanel value="create">
            <EmployeeRequestForm/>
          </TabPanel>
        </TabContext>
      </Box>
    );
}

export default EmployeeRequest;

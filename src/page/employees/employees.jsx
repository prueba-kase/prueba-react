import Box                       from '@mui/material/Box';
import Tab                       from '@mui/material/Tab';
import TabContext                from '@mui/lab/TabContext';
import TabList                   from '@mui/lab/TabList';
import TabPanel                  from '@mui/lab/TabPanel';
import { useEffect, useContext } from 'react';
import EmployeesForm             from '../../components/employees/employees-form';
import EmployeesList             from '../../components/employees/employees-list';
import { GlobalContext }         from '../../context/global_context';



const Employees = () => {
    const globalContext = useContext(GlobalContext);
    const handleChange = (_, newValue) => {
      globalContext.handleChangePageEmployee(newValue);
    };
  
    useEffect(() => handleChange(false,'list'),[]);

    return (
        <Box sx={{ 
            width: '100%',
            bgcolor: 'white',
            '&:hover': {bgcolor: 'dark',}
        }}>
        <TabContext value={globalContext.pageEmployee}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} >
              <Tab label="Listar Empleados" value="list" />
              <Tab label="Crear Empleados"  value="create" />
            </TabList>
          </Box>
          <TabPanel value="list">
            <EmployeesList/>
          </TabPanel>
          <TabPanel value="create">
            <EmployeesForm/>
          </TabPanel>
        </TabContext>
      </Box>
    );
}

export default Employees;

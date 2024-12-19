import Table             from '@mui/material/Table';
import TableBody         from '@mui/material/TableBody';
import TableCell         from '@mui/material/TableCell';
import TableContainer    from '@mui/material/TableContainer';
import TableHead         from '@mui/material/TableHead';
import TableRow          from '@mui/material/TableRow';
import Paper             from '@mui/material/Paper';
import { employeesList } from '../../services/employees_services';
import useFetchData      from '../../hooks/use_fetch_data';
import { GlobalContext } from '../../context/global_context';
import { useContext }    from 'react';

const EmployeesList = () => {
  const { handleList } = useContext(GlobalContext);
  const { data:employees, isLoading, generatedList } = useFetchData({
    key        : 'employees',
    callback   : employeesList,
    generateList : {
      start  : true,
      keyOne : 'id_employee',
      keyTwo : 'names'
    }
  });

  if (generatedList.length > 0 && employees.length > 0){
    handleList(generatedList, 'employees');
  }

  if (isLoading && !employees ){
    return <div>Cargando...</div>
  }

  if (!employees){
    return <div>No data available</div>
  }  
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead  >
          <TableRow >
            <TableCell style={{ fontWeight: 'bold' }}>Nombres</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Fecha de ingreso</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Salario</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((row) => (
            <TableRow
              key={row.id_employee}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{row.names}</TableCell>
              <TableCell >{new Date(row.entry_date).toLocaleString()}</TableCell>
              <TableCell >{row.salary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeesList;

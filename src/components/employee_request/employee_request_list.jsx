import Table                   from '@mui/material/Table';
import TableBody               from '@mui/material/TableBody';
import TableCell               from '@mui/material/TableCell';
import TableContainer          from '@mui/material/TableContainer';
import TableHead               from '@mui/material/TableHead';
import TableRow                from '@mui/material/TableRow';
import Paper                   from '@mui/material/Paper';
import { employeeRequetsList } from '../../services/employee_request_services'
import useFetchData            from '../../hooks/use_fetch_data';
import { GlobalContext }       from '../../context/global_context';
import { useContext }          from 'react';

const EmployeeRequestList = () => {
  const globalContext = useContext(GlobalContext);

  const { data:employeeRequest, isLoading } = useFetchData({
    key        : 'employeeRequest',
    callback   : employeeRequetsList,
    generateList : {
      start  : false,
      keyOne : '',
      keyTwo : ''
    }
  });

  if (isLoading && !employeeRequest ) {
    return <div>Cargando...</div>;
  }

  if (!employeeRequest) {
    return <div>No data available</div>
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead  >
          <TableRow >
            <TableCell style={{ fontWeight: 'bold' }}>Radicado</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Empleado</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Motivo</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Detalle</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeRequest.map((row) => (
            <TableRow
              key={row.id_employee_request}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{row.code}</TableCell>
              <TableCell >
                {globalContext.listEmployee.find(element => element.id === row.id_employee)?.name.toString()}
              </TableCell>
              <TableCell >{row.novelty}</TableCell>
              <TableCell >{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeeRequestList;

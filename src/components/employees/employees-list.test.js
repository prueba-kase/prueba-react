import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import EmployeesList      from './employees-list';
import { GlobalContext }  from '../../context/global_context';
import useFetchData       from '../../hooks/use_fetch_data'; 


jest.mock('../../hooks/use_fetch_data');
jest.mock('../../utils/constans.js', () => ({API_URL: 'http://localhost:3005/'}));

const mockContext = {handleList: jest.fn()};

test('renderiza la tabla de empleados correctamente', () => {
    useFetchData.mockReturnValue({
      data: [
        { id_employee: 1, names: 'Empleado 1', entry_date: '2023-01-15', salary: 1000 },
        { id_employee: 2, names: 'Empleado 2', entry_date: '2023-05-20', salary: 1500 },
      ],
        isLoading: false,
        generatedList: [
          { id: 1, name: 'Empleado 1' },
          { id: 2, name: 'Empleado 2' },
      ],
    });

    render(
      <GlobalContext.Provider value={mockContext}>
        <EmployeesList />
      </GlobalContext.Provider>
    );

    expect(screen.getByText('Nombres')).toBeInTheDocument();
    expect(screen.getByText('Fecha de ingreso')).toBeInTheDocument();
    expect(screen.getByText('Salario')).toBeInTheDocument();
    expect(screen.getByText('Empleado 1')).toBeInTheDocument();
    expect(screen.getByText('Empleado 2')).toBeInTheDocument();
});


test('muestra un mensaje de carga mientras se cargan los datos de la tabla de empleados', () => {
    useFetchData.mockReturnValue({
      data: null,
      isLoading: true,
      generatedList: [],
    });
    
    render(
      <GlobalContext.Provider value={mockContext}>
        <EmployeesList />
      </GlobalContext.Provider>
    );

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
});


test('muestra un mensaje cuando no hay datos disponibles en la tabla de empleados', () => {
    useFetchData.mockReturnValue({
      data: null,
      isLoading: false,
      generatedList: [],
    });

    render(
      <GlobalContext.Provider value={mockContext}>
        <EmployeesList />
      </GlobalContext.Provider>
    );

    expect(screen.getByText('No data available')).toBeInTheDocument();
});
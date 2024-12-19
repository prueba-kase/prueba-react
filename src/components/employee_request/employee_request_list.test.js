import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import EmployeeRequestList from './employee_request_list';
import { GlobalContext } from '../../context/global_context';
import useFetchData from '../../hooks/use_fetch_data'; 


jest.mock('../../hooks/use_fetch_data');
jest.mock('../../utils/constans.js', () => ({API_URL: 'http://localhost:3005/'}));


const mockGlobalContext = {
  listEmployee: [
    { id: 1, name: 'Jefferson Starling' },
    { id: 2, name: 'Jessica Diaz' },
    { id: 3, name: 'Cristian Herrera' },
  ],
};

test('renderiza la tabla de Solicitudes de empleados correctamente', () => {
    useFetchData.mockReturnValue({
      data: [
        { 
          id_employee_request: 1, 
          code: '0123456', 
          id_employee: 1, 
          novelty: 'Vacaciones', 
          description: 'Solicitud de vacaciones 12-2024' 
        },
      ],
      isLoading: false,
    });

    render(
      <GlobalContext.Provider value={mockGlobalContext}>
        <EmployeeRequestList />
      </GlobalContext.Provider>
    );

    expect(screen.getByText('Radicado')).toBeInTheDocument();
    expect(screen.getByText('Empleado')).toBeInTheDocument();
    expect(screen.getByText('Motivo')).toBeInTheDocument();
    expect(screen.getByText('Detalle')).toBeInTheDocument();


    expect(screen.getByText('0123456')).toBeInTheDocument();
    expect(screen.getByText('Jefferson Starling')).toBeInTheDocument();
    expect(screen.getByText('Vacaciones')).toBeInTheDocument();
    expect(screen.getByText('Solicitud de vacaciones 12-2024')).toBeInTheDocument();
});

test('Muestra un mensaje de carga mientras se cargan los datos de la tabla de solicitudes', () => {
    useFetchData.mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(
      <GlobalContext.Provider value={mockGlobalContext}>
        <EmployeeRequestList />
      </GlobalContext.Provider>
    );

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
});

test('muestra un mensaje cuando no hay datos disponibles en la tabla de solicitudes', () => {
    useFetchData.mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(
      <GlobalContext.Provider value={mockGlobalContext}>
        <EmployeeRequestList />
      </GlobalContext.Provider>
    );

    expect(screen.getByText('No data available')).toBeInTheDocument();
});
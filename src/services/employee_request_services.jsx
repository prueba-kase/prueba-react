import  customAxios  from "../utils/axios";

export const employeeRequetsList = async (query) => {
    try{
        const  { data:{data}  } = await customAxios.post("api/employee-request-list", { query });
        return data;
    }catch(error){
        console.error('Error al guardar empleados:', error);
        throw error; 
    }
};

export const employeeRequestSave = async (data) => {
    try{
        const  {request} = await customAxios.post("api/employee-request-save", { data });
        return request.status;
    }catch({response:{data:error}}){
        console.error('Error al guardar empleados:', error);
        throw error; 
    }
};

export const employeeRequestByEmployee = async (employeeId) => {
    const { resolve } = await customAxios.post("api/employee-request-save", { employeeId });
    return resolve;
};
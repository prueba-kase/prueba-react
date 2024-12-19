import  customAxios  from "../utils/axios";

export const employeesList = async (query) => {
    try{
        const  { data:{ data } } = await customAxios.post("api/employees-list", {query} );
        return data;
    }catch(error){
        console.error('Error al guardar empleados:', error);
        throw error; 
      }

};

export const employeesSave = async (data) => {
    try {
      const  {request}  = await customAxios.post("api/employees-save", { data });
      return request.status;
    } catch (error) {
      console.error('Error al guardar empleados:', error);
      throw error; 
    }
  };
  

export const employeeById = async (id) => {
    const { resolve } = await customAxios.post("api/employess-save", { id });
    return resolve;
};
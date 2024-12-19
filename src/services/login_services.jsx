import  customAxios  from "../utils/axios";

export const login = async ( data, context ) => {
    try {
        const {
                 data:
                    {data:{
                        token, 
                        login, 
                        profile
                    }}
               } = await customAxios.post("api/login", {data});
        if(login){
            context.openSession(login);
            context.handleToken(token);
            context.handleProfile(profile);
        }
        return login;
      } catch (error) {
        console.error('Error al iniciar sesion:', error);
        throw error; 
      }
};

export const logout = async () => {
    const { data } = await customAxios.post("api/auth/logout");
    return data;
}


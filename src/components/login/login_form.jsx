import { useFormik}                from 'formik';
import * as Joi                    from 'joi';
import TextField                   from '@mui/material/TextField';
import { Button, Box, Typography } from '@mui/material';
import { login }                   from '../../services/login_services';
import { useContext }              from 'react';
import { GlobalContext }           from '../../context/global_context';
import { useNavigate }             from 'react-router-dom';


const handleSubmit = async (values, actions, context, navigate) => {
  try {
    const isLogin = await login(values, context);
    if (isLogin) {
      actions.resetForm();
      navigate('/employees');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
}

const LoginForm = () => {

  const contextGlobal = useContext(GlobalContext);
  const navigate      = useNavigate(); 

  const validationSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      'string.email': 'Correo inválido',
      'string.empty': 'El correo es obligatorio',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Mínimo 6 caracteres',
      'string.empty': 'La contraseña es obligatoria',
    }),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const validate = (values) => {
    const { error } = validationSchema.validate(values, { abortEarly: false });
    if (!error) return {};
    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.path[0]] = detail.message;
    });
    return errors;
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values, actions)=> handleSubmit(values,actions,contextGlobal,navigate)
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 400,
        margin: '0 auto',
        padding: 4,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Iniciar Sesión
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <form onSubmit={formik.handleSubmit}> 
          <div className="flex flex-col pt-4">
            <TextField
              name       = "email"
              label      = "Email"
              value      = {formik.values.email}
              onChange   = {formik.handleChange}
              error      = {formik.touched.email && formik.errors.email}
              helperText = {formik.touched.email ? formik.errors.email : ''} 
              sx         = {{ marginBottom: 2 }}
              fullWidth
            />
          </div>
          <div className="flex flex-col pt-4">
            <TextField
              name       = "password"
              label      = "Contraseña"
              type       = "password"
              value      = {formik.values.password}
              onChange   = {formik.handleChange}
              error      = {formik.touched.password && formik.errors.password}
              helperText = {formik.touched.password ? formik.errors.password : ''} 
              sx         = {{ marginBottom: 2 }}
              fullWidth
            />   
          </div>
       
          <Button 
            type    = "submit" 
            variant = "contained" 
            color   = "primary">
            Ingresar
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;

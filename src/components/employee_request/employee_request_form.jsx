import { useFormik }           from 'formik';
import * as Joi                from 'joi';
import Box                     from '@mui/material/Box';
import TextField               from '@mui/material/TextField';
import Button                  from '@mui/material/Button';
import Grid                    from '@mui/material/Grid2';
import { employeeRequestSave } from '../../services/employee_request_services'; 
import { GlobalContext }       from '../../context/global_context';
import { useContext }          from 'react';
import { 
        Select, 
        MenuItem, 
        FormControl, 
        InputLabel, 
        FormHelperText 
      } from '@mui/material';

const handleSubmit = async (values,_,context) => {
  const status = await employeeRequestSave(values);
  if(status) context.handleChangePageEmployeeRequest('list');       
};

const EmployeeRequestForm = () => {
    const globalContext = useContext(GlobalContext);

    const validationSchema = Joi.object({
      code: Joi.string().required().messages({
        'string.empty': 'El radicado es obligatorio',
      }),
      id_employee: Joi.number().required().messages({
        'number.base': 'El empleado es obligatorio',
        'required': 'El empleado es obligatorio',
      }),
      novelty: Joi.string().required().messages({
        'string.empty': 'El motivo es obligatorio',
      }),
      description: Joi.string().required().messages({
        'string.empty': 'El detalle es obligatorio',
      }),
    });
  
    const initialValues = {
      code: '',
      id_employee: '',
      novelty: '',
      description: '',
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
      onSubmit: (values, actions)=> handleSubmit(values, actions, globalContext),
    });

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
      noValidate
      autoComplete="off"
    >
      <form onSubmit={formik.handleSubmit}> 
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6}>
                <TextField
                    id         = "code"
                    name       = "code"
                    label      = "Radicado"
                    variant    = "outlined"
                    value      = {formik.values.code}
                    onChange   = {formik.handleChange}
                    error      = {formik.touched.code && Boolean(formik.errors.code)}
                    helperText = {formik.touched.code && formik.errors.code}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <FormControl 
                  variant = "outlined" 
                  error   = {formik.touched.id_employee && Boolean(formik.errors.id_employee)}
                  sx      = {{ minWidth: 200 }}
                  fullWidth 
                >
                  <InputLabel id="id_employee-label">Empleado</InputLabel>
                  <Select
                    labelId  = "id_employee-label"
                    id       = "id_employee"
                    name     = "id_employee"
                    value    = {formik.values.id_employee}
                    onChange = {formik.handleChange}
                    label    = "Empleado"
                  >
                      <MenuItem value="">
                            <em>Seleccione un empleado</em>
                      </MenuItem>
                      {
                        globalContext.listEmployee.map((employee) => (
                          <MenuItem 
                              key   = { employee.id } 
                              value = { employee.id }>
                            {employee.name}
                          </MenuItem>
                        ))
                      }
                  </Select>
                  {
                    formik.touched.id_employee && formik.errors.id_employee && 
                    (<FormHelperText>{formik.errors.id_employee}</FormHelperText>)
                  }
                </FormControl>
            </Grid>            

            <Grid item xs={12} md={6}>
                <TextField
                    id         = "novelty"
                    name       = "novelty"
                    label      = "Motivo"
                    variant    = "outlined"
                    value      = {formik.values.novelty}
                    onChange   = {formik.handleChange}
                    error      = {formik.touched.novelty && Boolean(formik.errors.novelty)}
                    helperText = {formik.touched.novelty && formik.errors.novelty}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField
                    id         = "description"
                    name       = "description"
                    label      = "Detalle"
                    variant    = "filled"
                    value      = {formik.values.description}
                    onChange   = {formik.handleChange}
                    error      = {formik.touched.description && Boolean(formik.errors.description)}
                    helperText = {formik.touched.description && formik.errors.description}
                    multiline
                    fullWidth 
                />
            </Grid>

            <Grid item xs={12} md={6} display="flex" justifyContent="center">
                <Button type="submit" variant="contained"> 
                  Guardar
                </Button>
            </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EmployeeRequestForm;
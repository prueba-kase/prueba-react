import { useFormik }     from 'formik';
import * as Joi          from 'joi';
import Box               from '@mui/material/Box';
import TextField         from '@mui/material/TextField';
import Button            from '@mui/material/Button';
import Grid              from '@mui/material/Grid2';
import { employeesSave } from '../../services/employees_services';
import { GlobalContext } from '../../context/global_context';
import { useContext }    from 'react';

const handleSubmit = async(values,_,context) => {
    const status = await employeesSave(values);
    if(status) context.handleChangePageEmployee('list')
  }

const EmployeesForm = () => {

  const globalContext = useContext(GlobalContext);

  const validationSchema = Joi.object({
    names: Joi.string().required().messages({
      'string.empty': 'El nombre y apellido son obligatorios',
    }),
    entry_date: Joi.date().required().messages({
      'date.base': 'Fecha inválida',
      'required': 'La fecha de ingreso es obligatoria',
    }),
    salary: Joi.number().positive().required().messages({
      'number.base': 'El salario debe ser un número',
      'number.positive': 'El salario debe ser mayor a 0',
      'required': 'El salario es obligatorio',
    }),
  });

  const initialValues = {
    names: '',
    entry_date: '',
    salary: '',
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
    onSubmit: (values,actions)=>handleSubmit(values,actions, globalContext)
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
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
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={4}>
          <TextField
            id         = "names"
            name       = "names"
            label      = "Nombre y apellidos"
            variant    = "outlined"
            value      = {formik.values.names}
            onChange   = {formik.handleChange}
            error      = {formik.touched.names && Boolean(formik.errors.names)}
            helperText = {formik.touched.names && formik.errors.names}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            id         = "entry_date"
            name       = "entry_date"
            type       = "date"
            label      = "Fecha de ingreso"
            variant    = "outlined"
            value      = {formik.values.entry_date}
            onChange   = {formik.handleChange}
            error      = {formik.touched.entry_date && Boolean(formik.errors.entry_date)}
            helperText = {formik.touched.entry_date && formik.errors.entry_date}
            slotProps  = {{
                inputLabel: {
                  shrink: true,
                },
            }}
            fullWidth

          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            id         = "salary"
            name       = "salary"
            label      = "Salario"
            variant    = "outlined"
            value      = {formik.values.salary}
            onChange   = {formik.handleChange}
            error      = {formik.touched.salary && Boolean(formik.errors.salary)}
            helperText = {formik.touched.salary && formik.errors.salary}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={4} display="flex" justifyContent="center">
          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeesForm;
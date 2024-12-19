import Joi from 'joi';

const envVarsSchema = Joi.object({
  API_URL: Joi.string().required().description('Url base del backend'),
}).unknown();

const { error, value: envVars } = envVarsSchema.validate({
  API_URL: import.meta.env.VITE_API_URL
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default envVars;
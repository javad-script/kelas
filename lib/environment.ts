import z from 'zod';

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  SERVER_PORT: z.string().transform(Number).default(3000),
  DATABASE_URL: z.url('The DATABASE_URL must be an URL'),
  API_VERSION: z.coerce
    .number('the API_VERSION must be a number')
    .int('API_VERSION must be an integer.')
    .default(1),
  SECRET_KEY: z.string('The SECRET is required').min(10),
  HOST_URL: z.url('the HOST_URL must be an URL'),
});

const parseEnvironment = () => {
  const parsed = environmentSchema.safeParse(process.env);
  if (!parsed.success) {
    const errors = parsed.error?.flatten().fieldErrors;
    throw new Error(String('Environment Variable Error : ' + Object.values(errors)[0]));
  }
  return parsed.data;
};

const environment = parseEnvironment();

export default environment;

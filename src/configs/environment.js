import { config } from 'dotenv';

config();

const envs = {
  mongo: {
    mongo_uri: process.env.MONGO_URI || 'mongodb://localhost:27017/teams-api',
  },
  port: process.env.PORT || 3000,
  createAdmin: {
    enabled: process.env.CREATE_ADMIN || 0,
    admin: {
      email: process.env.CREATE_ADMIN_EMAIL,
      password: process.env.CREATE_ADMIN_PASSWORD,
      name: process.env.CREATE_ADMIN_NAME,
    },
  },
  validationStatusCode: 400,
};

export default envs;

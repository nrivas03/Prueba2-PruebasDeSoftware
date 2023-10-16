import mongoose from 'mongoose';
import envs from './environment';
import initialData from './initial-data';

const { mongo } = envs;

async function loadModels() {
  await import('../models/user/user.model');
}

async function connect() {
  return mongoose
    .connect(mongo.mongo_uri)
    .then(async () => {
      await loadModels();
      await initialData();
    })
    .catch((error) => {
      console.error(error);
      process.exit(-1);
    });
}

export default connect;

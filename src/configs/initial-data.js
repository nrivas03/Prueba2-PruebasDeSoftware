import userModel from '../models/user/user.model';
import envs from './environment';

const { createAdmin } = envs;

async function addAdmin() {
  if (createAdmin.enabled === 'true') {
    const { admin } = createAdmin;
    await userModel
      .create(admin)
      .then(() => console.log('Admin added'))
      .catch((error) => console.error(error));
  }
}

async function initialData() {
  await addAdmin();
}

export default initialData;

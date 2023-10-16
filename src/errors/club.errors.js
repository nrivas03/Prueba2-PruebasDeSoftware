import { required, mustBe } from './common.messages';

const ref = 'club';

export default {
  validation: {
    name: `${ref}_validation_error`,
    messages: {
      name: required('name'),
      description: mustBe({ key: 'description', type: 'string' }),
    },
  },
  adminNotFound: {
    name: `${ref}_admin_not_found_error`,
    message: 'the admin not found',
  },
};

import Joi from 'joi';
import clubErrors from '../errors/club.errors';
import { requiredString } from './schema-common-types';
import { HTTPError } from '../errors/error-response';
import envs from '../configs/environment';

const { validationStatusCode } = envs;
const validationErrorName = clubErrors.validation.name;

const createValidation = Joi.object()
  .required()
  .keys({
    name: requiredString(
      new HTTPError({
        name: validationErrorName,
        message: clubErrors.validation.messages.name,
        code: validationStatusCode,
      }),
    ),
    description: requiredString(
      new HTTPError({
        name: validationErrorName,
        message: clubErrors.validation.messages.description,
        code: validationStatusCode,
      }),
    ),
  });

// eslint-disable-next-line import/prefer-default-export
export { createValidation };

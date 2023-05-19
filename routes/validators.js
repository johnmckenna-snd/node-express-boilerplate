import { inspect } from 'node:util';
import { body, query, validationResult } from 'express-validator';

function catchValidationErrors (req, res, next) {
  if (validationResult(req)) {
    const { errors } = validationResult(req);

    if (errors.length > 0) {
      res.status(422).send(null, [{ message: 'Validation Errors', details: errors }]);
      next(new Error(`Validation Errors ${inspect(errors)}`));
    }
  }

  next();
}

export function checkEmailInBody () {
  return [body('email').trim().isEmail(), catchValidationErrors];
}

export function checkEmailInQuery () {
  return [query('email').trim().isEmail(), catchValidationErrors];
}

import { validationResult } from 'express-validator';

function catchValidationErrors (req, res) {
  if (validationResult(req)) {
    const errors = validationResult(req);

    if (errors.length > 0) res.status(422).send(null, errors);
  }
}

export default catchValidationErrors;

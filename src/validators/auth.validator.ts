import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const loginValidation = [
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be valid'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6, max: 50 })
    .withMessage('Password must have at least 6 characters, and maximum 50'),
];

export const handleValidationErrors = (request: Request, response: Response, next: NextFunction): void => {
  // Recoge todos los errores de validación
  const errors = validationResult(request);

  //Si hay errores los convierte en un array
  if (!errors.isEmpty()) {
    response.status(404).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array().map((error) => ({
        field: 'path' in error ? error.path : 'unknown',
        message: error.msg,
      })),
    });
    return;
  }

  next();
};

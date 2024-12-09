import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

class UserValidator {
 
  public registerValidator = [
    // Firstname: Only alphabets and spaces, 2-30 characters
    body('firstname')
      .isString()
      .isLength({ min: 2, max: 30 })
      .withMessage('Firstname must be between 2 and 30 characters')
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('Firstname must contain only alphabets and spaces'),

    // Lastname: Only alphabets and spaces, 2-30 characters
    body('lastname')
      .isString()
      .isLength({ min: 2, max: 30 })
      .withMessage('Lastname must be between 2 and 30 characters')
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('Lastname must contain only alphabets and spaces'),

    // Email: Valid email format using regex
    body('email')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      .withMessage('Invalid email format'),

    // Password: At least 8 characters with letters, numbers, and symbols
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^[A-Za-z\d@$!%*?&]{8,}$/)
      .withMessage('Password must contain a mix of letters, numbers, and symbols'),

    // Error handling middleware
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

  // Login validation rules
  public loginValidator = [
    body('email')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      .withMessage('Invalid email format'),

    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .withMessage('Password must contain a mix of letters, numbers, and symbols'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

  // Validate email for forget password
  public emailValidator = [
    body('email')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      .withMessage('Invalid email format'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

  // Reset password validation rules
  public resetPasswordValidator = [
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('New password must be at least 8 characters long')
      .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .withMessage('New password must contain a mix of letters, numbers, and symbols'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
}

export default UserValidator;

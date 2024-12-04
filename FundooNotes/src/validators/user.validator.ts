import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

class UserValidator {
  // Register validation rules
  public registerValidator = [
    body('firstname').isString().isLength({ min: 2, max: 30 }).withMessage('Firstname must be between 2 and 30 characters'),
    body('lastname').isString().isLength({ min: 2, max: 30 }).withMessage('Lastname must be between 2 and 30 characters'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

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
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

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
    body('email').isEmail().withMessage('Invalid email format'),

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
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),

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

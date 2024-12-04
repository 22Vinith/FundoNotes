import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

class NoteValidator {
  // Define the validation rules
  public validateNote = [
    body('title').isString().notEmpty().withMessage('Title is required'),
    body('description').isString().notEmpty().withMessage('Description is required'),
    body('color').optional().isString().withMessage('Color must be a string'),
    body('isArchive').optional().isBoolean().withMessage('isArchive must be a boolean'),
    body('isTrash').optional().isBoolean().withMessage('isTrash must be a boolean'),
    body('createdBy').isString().notEmpty().withMessage('CreatedBy is required'),

    // Middleware to check for validation errors
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
}

export default NoteValidator;

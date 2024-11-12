import { Request, Response, NextFunction } from 'express';
import Joi from '@hapi/joi';

class NoteValidator {
  private noteSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    color: Joi.string().optional(),
    createdBy: Joi.string().required()
  });

  public validateNote = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = this.noteSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      next();
    }
  };
}

export default NoteValidator;

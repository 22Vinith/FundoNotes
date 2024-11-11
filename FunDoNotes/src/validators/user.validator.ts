import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

class UserValidator {
  public registervalidator = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      firstname: Joi.string()
        .min(2)
        .max(30)
        .required(),
        
    
      lastname: Joi.string()
        .min(2)
        .max(30)
        .required(),
        
    
      email: Joi.string()
        .email()
        .required(),
        
    
      password: Joi.string()
        .min(8)
        .required(),
        
    });
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };


  public loginvalidator = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({

      email: Joi.string()
      .email()
      .required(),
      
  
    password: Joi.string()
      .min(8)
      .required()

    });
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  


  }

}

export default UserValidator;

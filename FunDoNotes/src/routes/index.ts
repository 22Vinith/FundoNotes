import express, { IRouter } from 'express';
import noteRoutes from './note.route';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swaggers/openapi.json';



import userRoute from './user.route';
// import noteRoutes from './note.Routes';
const router = express.Router();
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', new userRoute().getRoutes());
  router.use("/notes", new noteRoutes().getRoutes())
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



  return router;
};

export default routes;

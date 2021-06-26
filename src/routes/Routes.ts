import { Router } from 'express';

import { SignUpController, SignInController, ProductController } from '../controllers';


const routes = Router();

routes.get('/', (_, res) => res.send('Working...'));
routes.post('/sign-up', SignUpController.validateSingUp, SignUpController.signUp);
routes.post('/sign-in', SignInController.validateSingIn, SignInController.signIn);

// Products CRUD    
routes.get('/products', ProductController.validateGetAll, ProductController.getAll);
routes.post('/products', ProductController.validateCreate, ProductController.create);

export { routes };

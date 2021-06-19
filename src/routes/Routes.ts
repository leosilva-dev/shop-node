import { Router } from 'express';

import { SignUpController, SignInController } from '../controllers';


const routes = Router();

routes.get('/', (_, res) => res.send('Working...'));
routes.post('/sign-up', SignUpController.validateSingUp, SignUpController.signUp);
routes.post('/sign-in', SignInController.validateSingIn, SignInController.signIn);

export { routes };

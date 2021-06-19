import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { celebrate, Joi } from 'celebrate';

import { UserProvider } from '../../database/providers';
import { verifyPassword } from '../../services';

const validateSingIn = celebrate({
    body: Joi.object({
        email: Joi.string().email().max(200).required(),
        password: Joi.string().min(6).required(),
    }),
}, { abortEarly: false });

const signIn = async (req: Request, res: Response) => {
    try {
        const { password, email } = req.body;

        const user = await UserProvider.readUserByEmail(email);
        if (typeof user === 'string') {
            return res.status(StatusCodes.BAD_REQUEST).send(user);
        }

        if (await verifyPassword(password, user.password)) {
            return res.status(StatusCodes.OK).json({ accessToken: 'jwt-123456789-jwt' });
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).send('Usuário ou senha são inválidos.');
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Algum erro interno.");
    }
}

export const SignInController = {
    signIn,
    validateSingIn,
}

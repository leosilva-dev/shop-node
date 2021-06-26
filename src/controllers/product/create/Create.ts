import { Request, Response } from 'express';
import { celebrate, Joi } from 'celebrate';
import { StatusCodes } from 'http-status-codes';

import { ProductProvider } from '../../../database/providers';

export const validateCreate = celebrate({
    body: Joi.object({
        category: Joi.string(),
        price: Joi.number().required(),
        stock: Joi.number().required(),
        discount: Joi.number().required(),
        description: Joi.string().required(),
        images: Joi.array().items(
            Joi.object({
                name: Joi.string().required(),
                type:Joi.string().required(),
                content:Joi.string().required(),
        }),
        ),
    }),
});


export const create = async (req: Request, res: Response) => {
    const addedProduct = await ProductProvider.create(req.body);

    if(typeof addedProduct === 'string'){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(addedProduct);
    }
    else{
        return res.status(StatusCodes.CREATED).json(addedProduct);
    }
}
import { Request, Response } from 'express';
import { celebrate, Joi } from 'celebrate';
import { StatusCodes } from 'http-status-codes';

import { ProductProvider } from '../../../database/providers';

export const validateGetAll = celebrate({
    query: Joi.object({
        search: Joi.string(),
        page: Joi.number().min(0),
        limit: Joi.number().min(0),
    }),
});


export  const getAll = async (req: Request, res: Response) => {
    const { search = '', page = 1, limit = 10 } = req.query;

    const products = await ProductProvider.getAll(Number(page), Number(limit), String(search));
    const count = await ProductProvider.count();

    if(typeof products === 'string'){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(products);
    }else if(typeof count === 'string'){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(count);
    }
    else{
        res.setHeader('access-control-expose-headers', 'x-total-count');
        res.setHeader('x-total-count', count);
        return res.status(StatusCodes.OK).json(products);
    }
}
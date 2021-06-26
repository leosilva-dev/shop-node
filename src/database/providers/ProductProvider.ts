import { Knex } from "../connection";
import { IImage } from "./ImageProvider";
import { TableNames } from "../TableNames";


export interface IProduct {
  id: number;
  price: string;
  stock: string;
  discount: string;
  category?: string;
  description?: string;
  images: IImage[];

}

const getAll = async (): Promise<string | IProduct[]> => {
  try {
    const products = await Knex(TableNames.product).select<IProduct[]>('*');
    return products;
  } catch (error) {
    return 'Erro ao consultar os produtos na base';
  }
}

const getById = async (id: number): Promise<string | IProduct> => {
  try {
    const product = await Knex(TableNames.product)
      .select<IProduct[]>('*')
      .where({ id })
      .first();

    if (!product) return 'Produto não encontrado';

    return product;
  } catch (error) {
    return 'Erro ao consultar o produto na base';
  }
}

const create = async (productToCreate: Omit<IProduct, 'id'>): Promise<string | IProduct> => {
  try {
    const [insertedId] = await Knex(TableNames.product).insert(productToCreate);
    return {
      id: insertedId,
      ...productToCreate,
    };
  } catch (error) {
    return 'Erro ao criar o produto na base';
  }
}

const updateById = async (id: number, productToUpdate: IProduct): Promise<string | IProduct> => {
  try {
    await Knex(TableNames.product)
      .update(productToUpdate)
      .where({ id });

    return productToUpdate;
  } catch (error) {
    return 'Erro ao atualizar o produto na base';
  }
}

const deleteById = async (id: number): Promise<string | void> => {
  try {

    await Knex
    .delete(TableNames.image)
    .innerJoin(
      `${TableNames.productImage}`,
      `${TableNames.productImage}.imageId`,
      `${TableNames.image}.id`
    )
    .where(`${TableNames.productImage}.productId`, '=', id);

    await Knex
      .delete(TableNames.product)
      .where({ id });
  } catch (error) {
    return 'Erro ao consultar o produto na base';
  }
}

export const ProductProvider = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
}
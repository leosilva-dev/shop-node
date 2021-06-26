import { TableNames } from "../TableNames";
import { Knex } from "../connection";

export interface IImage {
  id: number;
  name: string;
  type: string;
  content: string;
}

const getAll = async (): Promise<string | IImage[]> => {
  try {
    const images = await Knex(TableNames.image).select<IImage[]>('*');
    return images;
  } catch (error) {
    return 'Erro ao consultar as imagens na base';
  }
}

const getById = async (id: number): Promise<string | IImage> => {
  try {
    const image = await Knex(TableNames.image)
      .select<IImage[]>('*')
      .where({ id })
      .first();

    if (!image) return 'Imagem não encontrada';

    return image;
  } catch (error) {
    return 'Erro ao consultar a imagem na base';
  }
}

const create = async (imageToCreate: Omit<IImage, 'id'>): Promise<string | IImage> => {
  try {
    const [insertedId] = await Knex(TableNames.image).insert(imageToCreate);
    return {
      id: insertedId,
      ...imageToCreate,
    };
  } catch (error) {
    return 'Erro ao criar a imagem na base';
  }
}

const updateById = async (id: number, imageToUpdate: IImage): Promise<string | IImage> => {
  try {
    await Knex(TableNames.image)
      .update(imageToUpdate)
      .where({ id });

    return imageToUpdate;
  } catch (error) {
    return 'Erro ao atualizar a imagem na base';
  }
}

const deleteById = async (id: number): Promise<string | void> => {
  try {
    await Knex(TableNames.image)
      .delete(TableNames.image)
      .where({ id });
  } catch (error) {
    return 'Erro ao consultar a imagem na base';
  }
}

export const ImageProvider = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
}
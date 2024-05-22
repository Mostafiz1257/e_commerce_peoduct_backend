import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

//Add a new product
const createProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

//get all product from DB
const getAllProductsFromDB = async (searchTerm?: string) => {
  try {
    if (searchTerm) {
      const result = await ProductModel.find({
        name: { $regex: searchTerm, $options: 'i' }, 
      });
      return result;
    } else {
      const result = await ProductModel.find();
      return result;
    }
  } catch (error) {
    throw new Error('Failed to fetch products from the database');
  }
};




//get a single product
const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });
  console.log(result);
  return result;
};

//update a product
const updateProductFromDB = async (id: string, updateData: object) => {
  try {
    const result = await ProductModel.findByIdAndUpdate(
      id,
      { $set: updateData  },
      { new: true, runValidators: true },
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

//delete a product
const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id });
  return result;
};

export const productService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};

import { Request, Response } from 'express';
import { productService } from './product.service';
import { TProduct } from './product.interface';
import ProductValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    //zod validation schema
    const zodParseData = ProductValidationSchema.parse(productData);
    const result = await productService.createProductIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create new data',
      error: error,
    });
  }
};

//Get All product from DB
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const result = await productService.getAllProductsFromDB(searchTerm);

    if (result.length === 0 && searchTerm) {
      res.status(404).json({
        success: false,
        message: 'No products found matching the search term',
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Successfully retrieved products',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve products',
      error: error 
    });
  }
};


//Get a single product by ID
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productService.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Successfully get the product Data',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get the product Data by the product id',
    });
  }
};

//Update a product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const result = await productService.updateProductFromDB(
      productId,
      updateData,
    );

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update data',
      error: error,
    });
  }
};

//Delete a product
const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await productService.deleteProductFromDB(productId);
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
    data: result,
  });
};

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};

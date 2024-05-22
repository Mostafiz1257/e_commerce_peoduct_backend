import cors from 'cors';
import express, { Application, Request, Response, request } from 'express';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRouters } from './app/modules/orders/order.router';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

app.use((req: Request, res: Response, next) => {
  next();
});
//product routes
app.use('/api/products', ProductRoutes);
//orders router
app.use('/api/orders', OrderRouters)


const getAController = (req: Request, res: Response) => {
  res.send('E-commerce product backed sice!');
};
app.get('/', getAController);

app.use((req: Request, res: Response) => {
 res.status(400).json({
  success:false,
  message:"Route not found"
 })
});

export default app;

import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRouters } from './app/modules/orders/order.router';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

app.use((req: Request, res: Response, next) => {
  console.log('Received query parameters:', req.query);
  next();
});
//product routes
app.use('/api/products', ProductRoutes);
//orders router
app.use('/api/orders', OrderRouters)


const getAController = (req: Request, res: Response) => {
  res.send('Hello World!');
};
app.get('/', getAController);
console.log(process.cwd());

export default app;

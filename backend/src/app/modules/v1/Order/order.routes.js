import { Router } from 'express';
import auth from '../../../middlewares/auth.js';
import { OrderController } from './order.controller.js';
const router = Router();
router.post('/create-order', auth('USER'), OrderController.CreateOrder);
router.get('/:id', auth('USER'), OrderController.GetOrderStatus);
router.get('/', auth('ADMIN'), OrderController.GetAllOrder);
router.patch(
  '/change-order-status',
  auth('ADMIN'),
  OrderController.ChangeOrderStatus,
);

export const OrdersRoutes = router;

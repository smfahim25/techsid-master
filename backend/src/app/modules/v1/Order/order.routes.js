import { Router } from 'express';
import { OrderController } from './order.controller.js';
const router = Router();
router.post('/create-order', OrderController.CreateOrder);
router.get('/', OrderController.GetAllOrder);
router.patch('/change-order-status', OrderController.ChangeOrderStatus);

export const OrdersRoutes = router;

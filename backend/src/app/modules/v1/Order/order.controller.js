import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync.js';
import sendResponse from '../../../utils/sendResponse.js';
import { OrderService } from './order.service.js';

const CreateOrder = catchAsync(async (req, res) => {
  const result = await OrderService.CreateOrder(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Created Successfully!',
    data: result,
  });
});
const GetAllOrder = catchAsync(async (req, res) => {
  const result = await OrderService.GetAllOrder();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Orders Successfully!',
    data: result,
  });
});
const ChangeOrderStatus = catchAsync(async (req, res) => {
  const result = await OrderService.ChangeOrderStatus(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Change Order Status Successfully!',
    data: result,
  });
});

export const OrderController = {
  CreateOrder,
  GetAllOrder,
  ChangeOrderStatus,
};

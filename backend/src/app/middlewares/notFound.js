import httpStatus from 'http-status';
import sendResponse from '../utils/sendResponse.js';
const notFound = (req, res, next) => {
  sendResponse(res, {
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: 'API Not Found !!',
  });
};

export default notFound;

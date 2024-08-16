import httpStatus from 'http-status';
const notFound = (req, res, next) => {
  return res.status(httpStatus.NOT_FOUND).json({
    message: 'Api Not Found',
  });
};

export default notFound;

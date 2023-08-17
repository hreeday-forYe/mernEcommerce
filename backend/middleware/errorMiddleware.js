// this will be called if no other middleware has handled the request and it will create new error object 
// and set the code to 404 not found

const notFound = (req, res,next) =>{
  let error = new Error( `Not Found- ${req.originalUrl}`);
  res.status(404);
  next(error);
};


// overwrite this default express error handler
const errorHandler = (err, req, res, next) =>{
  let statusCode = res.statusCode ===200? 500: res.statusCode;
  let message = err.message;

  // check for mongoose bad object id or cast error
  if (err.name === "CastError" && err.kind ==="ObjectId") {
    message = `Resource  not found`;
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production"? "": err.stack,
  });
};


export {notFound, errorHandler}

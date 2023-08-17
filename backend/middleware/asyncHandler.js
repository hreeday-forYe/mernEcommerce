// The function will avoid the overhead of try...catch block or when using functions that returns promises
const asyncHandler = fn => (req, res, next) =>{
  Promise.resolve(fn(req, res,next)).catch(next);
}

export default asyncHandler;
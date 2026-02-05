const { constants } = require('./constants');
const errorHandler = (err, req, res, next) => {
    const statusCode=res.statusCode?res.statusCode:(500);
    switch(statusCode){
        case constants:
         res.json({title:"Validation Error",message: err.message,stackTrace:err.stackTrace});
            break;
        case constants.UNAUTHORIZED:
         res.json({title:"Unauthorized",message: err.message,stackTrace:err.stackTrace});
            break;
        case constants.FORBIDDEN:
         res.json({title:"Forbidden",message: err.message,stackTrace:err.stackTrace});
            break;
        case constants.NOT_FOUND:
         res.json({title:"Not Found",message: err.message,stackTrace:err.stackTrace});
            break;
        case constants.INTERNAL_SERVER_ERROR:
         res.json({title:"Internal Server Error",message: err.message,stackTrace:err.stackTrace});
            break;
        default:
            break;
    }
};
module.exports = {errorHandler};


export const returnRes = (res,statusCode,data)=>{
    return res.status(statusCode).json(data);
}
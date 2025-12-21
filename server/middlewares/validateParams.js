const validateParams = (schema)=>(req,res,next)=>{
    const {error} = schema.validate(req.params);

    if(error){
        return res.status(400).json({message:'Parameter validation error'});
    }

    next();
}

export default validateParams;
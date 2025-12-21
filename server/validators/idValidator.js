import joi from 'joi';

const idSchema = joi.object({
    id: joi.string().hex().length(24).required()
});


export {idSchema};
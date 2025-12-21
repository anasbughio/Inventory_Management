import joi from 'joi';

const registerSchema = joi.object({
username :joi.string().min(3).max(30).required(),
email:joi.string().email().required(),
password:joi.string().min(6).required(),
roles:joi.array().items(joi.string().valid('admin','store-keeper')).default(['store-keeper'])

});

const loginSchema = joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(6).required()
});

export {registerSchema,loginSchema};
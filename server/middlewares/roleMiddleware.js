const isAdmin = (req,res,next)=>{
    if(req.user && req.user.roles === 'admin'){
        next();
    
    }else{
        res.status(403).json({message:'Access denied, admin only'});
    }
}


const isAdminorStoreKeeper = (req,res,next)=>{
    if(req.user && (req.user.roles === 'admin' || req.user.roles === 'store-keeper')){
        next();
    }else{
        res.status(403).json({message:'Access denied, store-keeper only'});
    }
}

export {isAdmin,isAdminorStoreKeeper};

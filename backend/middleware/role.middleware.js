const checkRole = (allowedRole)=>{

    //we return a function that will be used as middleware in the routes where we want to check the role of the user
    //middleware Factory => create custom middleware dynamically
    return(req,res,next)=>{
        if(req.user.role !== allowedRole){
            return res.status(403).json({
                message:"Access Forbidden"
            });
        }
        next(); //call the next middleware or route handler if the role is allowed
    };
}

module.exports= checkRole; //exporting the middleware factory function so that it can be used in other files
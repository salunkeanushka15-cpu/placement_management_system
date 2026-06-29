const jwt = require("jsonwebtoken"); //importing jsonwebtoken library for handling JWT tokens

//middleware function
const verifyToken =(req, res, next) =>{ //next() means token is verified and so continue

    const authHeader = req.headers.authorization; //get the auth header from the incoming request

    if(!authHeader){ //checking whether the header exists
        return res.status(401).json({ //401=> unauthorised (ur not logged in)
            message: "Access denied. No token provided"
        });
    }

    const token = authHeader.split(" ")[1]; //extract the token from the header (Bearer <token>) and we split it and take the 2nd part of the array which is the actual token

    //verify the token now
    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) =>{
            //for invalid token
            if(err){
                return res.status(403).json({ //403=> forbidden (ur logged in but not authorised to access this resource)
                    message : "Invalid token"
                });
            }
            req.user = decoded //attach the user to req object (so that we can access it in the next middleware or route handler)
            
            next(); //call the next middleware or route handler
        }
    );
};

module.exports= verifyToken; //exporting the middleware function so that it can be used in other files
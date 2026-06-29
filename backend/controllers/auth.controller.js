const db = require("../db");  //gives access to the database
const bcrypt = require("bcryptjs"); // gives u password hashing fuction
const jwt = require("jsonwebtoken"); //for generating login token ..used in login

//REGISTER FUNCTION
exports.register =(req,res)=> {  //creates a function called register which is exported ...to be used by the routes file
    const { name, email, password, role} = req.body; //here we are deconstructing the info of the person given by postman

    //VALIDATION
    if (!name || !email || !password || !role){ //BASIC VALIDATION--> if any feild is missing , stop--->>
        return res.status(400).json({message:"All feilds are required"}); //--> then 400 error request sent...(means bad request form client.)
    }

    //check duplicate email
    const checkUserQuery = "SELECT * FROM users WHERE email=?"; //checks if email already exists ..? is the placeholder used for avoiding sql injection

    db.query(checkUserQuery, [email], async (err,results) =>{
        if(err){
            return res.status(500).json({error:err.message}); //500 means server error
        }
        //email already exists
        if(results.length>0){
            return res.status(400).json({message:"Email already exists"});
        }

        try{

            //hash the password
            const hashedPassword = await bcrypt.hash(password,10);

            //insert query(user)
            const insertQuery = `
            INSERT INTO users(name,email,password,role)
            VALUES(?,?,?,?)
            `;

            db.query(
                insertQuery,
                [name,email,hashedPassword,role],
                (err,result)=>{

                    if(err){
                        return res.status(500).json({
                            error:err.message
                        });
                    }

                    
                    res.status(201).json({
                        message:"User registered successfully"
                    });

                }
            );

        }
        catch(error){
            res.status(500).json({
                error:error.message
            });
        }
    }
)

}

//LOGIN FUNCTION
exports.login = (req,res) =>{
    const{email, password} =req.body; //getting login credentials from the request body

    if(!email || !password){ //basic validation....if any field missing ---> then backend stop an send error
        return res.status(400).json(
            {message:"Email and password required"}
        );
    }

    //find the user : by checking if the email exists in the database
    const findUserQuery = "SELECT * FROM users WHERE email = ?";

    db.query(
        findUserQuery,
        [email],
        async (err,results) => {
            if(err){ //handles any error that occurs during the database query
                return res.status(500).json({
                    error : err.message
                });
            }
            if(results.length === 0){
                return res.status(400).json({
                    message:"Invalid email or password" 
                });
            }

            const user = results[0]; //if email exists then we get the user details in results array and we take the first element of that array

            //bcrypt step for comparing passwords
            const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

            //if wrong password
            if(!isMatch){
                return res.status(400).json({
                    message: "Invalid email or password"
                });
            }
            //after login is successful we generate jwt token for the user to maintain session and authenticate future requests
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );
            //send response with token and user role
            res.status(200).json({
                message:"Login successful",
                token,
                role: user.role
            });

        }
);

};

const db = require("../db"); //Access to database

exports.createStudentProfile = (req,res)=>{
    const {
        branch,
        cgpa,
        backlogs,
        skills,
        phone
    } = req.body; //this will be the data sent by the frontnd/postman

    const user_id = req.user.id; //logged in users id  to connect the profile with the correct user

    //validation
    if(
        !branch ||
        !cgpa ||
        backlogs === undefined || //backlogs ca be 0 so we check for undefined instead of falsy value
        !skills ||
        !phone
    ){
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const insertQuery =`
    INSERT INTO students
    (user_id, branch,cgpa,backlogs,skills,phone)
    VALUES(?,?,?,?,?,?)
    `
    ;

    db.query(
    insertQuery,
    [user_id, branch, cgpa, backlogs, skills, phone],
    (err, result) => {
        if(err){
        return res.status(500).json({
                error: err.message
            });
        }

        res.status(201).json({
        message: "Student profile created successfully"
        });
    }
);
};
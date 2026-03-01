/*const jwt=require("jsonwebtoken");
//validate the token use jwt
//midddleware
const verifyToken=(req,res,next)=>
{
let token;
let authHeader=req.headers.Authroization||req.headers.authroization;
if(authHeader&&authHeader.startsWith("Bearer"))
{
    token=authHeader.split(" ")[1];//get the token value from header
if(!token)
{
    return res.status(401).json({message:"no token,authorization denied"});
}
//case when we get the token --it needed to be decode
try{
const decode=jwt.verify(token,process.env.JWT_SECRET);  
req.user=decode;
console.log("the decoded user is :",req.user);
next();
}catch(err)
{
    res.status(400).json({message:"token is not valid"});
}
}
};
module.exports=verifyToken;
*/
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Decoded user:", req.user);
        next();
    } catch (err) {
        return res.status(400).json({ message: "Token is not valid" });
    }
};

module.exports = verifyToken;
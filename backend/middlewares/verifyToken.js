const jwt = require("jsonwebtoken");

//verify token
function verifyToken(req, res , next){
      const authtoken =  req.headers.authorization;
      if (authtoken){
          const token = authtoken.split(" ")[1];
        try {
            const decodedPayload = jwt.verify(token , process.env.JWT_PASSWORD) ;
            req.user  = decodedPayload;
            next();
        } catch (error) {
            return res.status(401).json({message: "invalid token"})
        }
      } 
      else{
        return res.status(401).json({message: "no token provided , access denied"})
      }   
}

//verify token and admin 
function verifyTokenAndAdmin (req , res , next){
     verifyToken(req , res , ()=> {
        if(req.user.isAdmin){
            next();
        }
        else{
            return res.status(403).json({message: "u dont have access, u are no admin"})
        }
     })   
}

//verify token and admin 
function verifyTokenAndPrivate (req , res , next){
    verifyToken(req , res , ()=> {
       if(req.user.id == req.params.id){
           next();
       }
       else{
           return res.status(403).json({message: "u dont have access"})
       }
    })   
}

function verifyTokenAndAdminAndHimself (req , res , next){
    verifyToken(req , res , ()=> {
        if(req.user.id == req.params.id || req.user.isAdmin){
            next();
        }
        else{
            return res.status(403).json({message: "u dont have access"})
        }
     });   
}


module.exports= {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndPrivate,
    verifyTokenAndAdminAndHimself,
}
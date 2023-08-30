import { User } from "../models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const OTP_CONFIG = {
    upperCaseAlphabets: true,
    specialChars: false,
}

export async function verifyUser(req, res, next) {
    try{
        const { username } = req.method == "GET" ? req.query : req.body;

        // check user existence
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send({ error: "Cannot find user"}) 
        next();
    }catch(error){
       return res.status(404).send({ error: "Authentication Error!" });  
    }
}

export async function register(req, res, next){
    try{
        const { username, password, profile, email } = req.body;
     
        //check if the username already exists
        const userExists = await User.findOne({ username }).exec();

        if(userExists){
            res.status(400).json({ message: "Use Unique Username"})
        }

        // check if the email already exists
        const emailExists = await User.findOne({ email }).exec();
         
        if(emailExists){
            return res.status(400).json({ error: "Please use a unique email" })
        }

        if(password){
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const user = new User({
                username,
                email,
                password: hashedPassword,
                profile: profile || '',
            });

            await User.save();

            return res.status(201).json({ msg: "Registration Successful!" })
        }

      return res.status(500).json({ error: "Unable to hash password"})
    }catch(error){
      return res.status.json({ error: "An error occured "})
    }
}




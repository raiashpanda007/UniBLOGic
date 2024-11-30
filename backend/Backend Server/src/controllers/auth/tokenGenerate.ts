import jwt from 'jsonwebtoken';

interface dataRefreshToken{ 
    id:string
    username:string
    role:string
    email:string
    branch?:string
    batch?:number 

}
interface dataAccessToken{
    id:string
    username:string
    role:string
}
const refresh_secret = process.env.REFRESH_TOKEN_SECRET ;
const access_secret = process.env.ACCESS_TOKEN_SECRET;
const generateRefreshToken = async (data:dataRefreshToken) =>{
    if(!refresh_secret) throw new Error('Refresh token not found');
    return jwt.sign(data, refresh_secret, {expiresIn: '7d'});
}


export {
    generateRefreshToken,
   
}

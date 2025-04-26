import jwt from 'jsonwebtoken'

export const generateToken = (userId, email, role) =>{
    const payload = {userId, email,role}
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1day'})
    return token;
}
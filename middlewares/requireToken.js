import jwt from 'jsonwebtoken'

export const requiereToken = (req, res, next) => {

try {
    console.log(req.headers)
    let token = req.headers?.authorization
    if (!token) throw new Error('no existe el token en el header')
    // console.log('token-----', token)
    token = token.split(" ")[1]
    const {uid} = jwt.verify(token, process.env.JWT_SECRET)
    console.log('---------------!!!!', req.uid)
    req.uid = uid
    next()

} catch (error) {
    return res.status(401).json({error: error.message})
}

} 
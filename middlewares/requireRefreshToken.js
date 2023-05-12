import { tokenVerificationErrors } from "../utils/tokenManager.js";
import jwt from "jsonwebtoken"

export const requireRefreshtToken = (req, res, next) => {

    try {
        const refreshTokenCookie = req.cookies.refreshToken;

        // console.log("refreshTokenCookie---!!!!", req.cookies)
        if (!refreshTokenCookie) throw new Error("No existe el token");

        console.log('antes del jwt.verify')
        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
        console.log('paso el jwt.verify')

        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: tokenVerificationErrors[error.message] });
    }

}
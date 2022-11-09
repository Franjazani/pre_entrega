import config from "../config";

export const checkAdmin = (req, res, next) => {

if (!config.administrador)
    return res.status(401).json({
        msg: "No estas autorizado"
    })
    next();
}
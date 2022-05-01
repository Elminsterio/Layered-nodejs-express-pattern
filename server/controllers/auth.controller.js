const loginService = require('../services/auth.service');

exports.userLogin = async (req, res, next) => {

    const { email, password } = req.body;

    try {      
        let { token, refreshToken, user } = await loginService.userLogin(email, password);
        return res.json({
            user,
            token,
            refreshToken
        });    
    } catch (error) {
        next(error);
    }
}

exports.letsRefreshToken = async function(req, res, next) {

    let refreshToken = req.body.refreshToken;

    try {      
        let newToken = await loginService.letsRefreshToken(refreshToken);
        return res.json({token: newToken});  
    } catch(error) {
        next(error);
    }
}

exports.userLogout = async (req, res, next) => {

    let id = req.user._id;
    
    try {      
        await loginService.userLogout(id);
        return res.json({});  
    } catch(error) {
        next(error);
    }
}
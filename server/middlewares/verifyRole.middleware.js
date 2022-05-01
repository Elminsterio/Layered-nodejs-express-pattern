const { InsufficientPermisionError } = require('../utils/customErrors.util');

let verifyOwnId = (req, res, next) => {

    let idProvided = req.params.id;
    let user = req.user;

    if (idProvided === user._id) {
        next();
    } else {
        return next(new InsufficientPermisionError('You are not authorized to perform this action'));
    }
}

module.exports = {
    verifyOwnId,
};

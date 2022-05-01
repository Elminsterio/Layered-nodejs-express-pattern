const User = require('../models/user.model');
const refreshToken = require('../models/refreshToken.model');
const { deleteFolder, deleteFile } = require('../utils/files.util');
const { ErrorBDEntityFound, ErrorBDEntityNotFound } = require('../utils/customErrors.util');

const bcryptjs = require('bcryptjs');
const crypto = require('crypto');


let createUser = async function(email, password, body) {
    try {
        let user = await User.findOne({ email });
        if (user) throw new ErrorBDEntityFound('Email already exists on database');
        
        user = new User(body)

        const salt = await bcryptjs.genSalt(11);
        user.password = await bcryptjs.hash(password, salt);
        
        await user.save();
        user.active = undefined;
        
        return user;
    } catch(error) {
        throw error;
    }
}

let updateUser = async function(body, id, role) {
    try {
        
        let user;

        if(body.email) {
            user = await User.findOne({email: body.email});
            if (user) throw new ErrorBDEntityFound('This email exists, please change the email provided');
        }

        if(body.password) {
            const salt = await bcryptjs.genSalt(11);
            body.password = await bcryptjs.hash(body.password, salt);
        }

        user  = await User.findByIdAndUpdateActivesNoShowActives(id, body);

        if (!user) throw new ErrorBDEntityNotFound('User doesn\'t exist');

        return user;
    } catch(error) {
        throw error;
    }
}

let getUsers = async function(role = {}) {
    try {
        let user = await User.find(role)
                             .where({active: true})
                             .select('_id name creationDate img');
        if (!user) throw new ErrorBDEntityNotFound(`There\'s no ${role} users on database`);

        return user;
    } catch (error) {
        throw error;
    }
}

let getUserID = async function(id) {
    try {
        let user = await User.findByIdActivesNoShowActives(id)
                             
        if (!user) throw new ErrorBDEntityNotFound('User doesn\'t exist');

        return user;
    } catch (error) {
        throw error;
    }
}

let deleteUser = async function(id) {
    try {
        let user = await User.findByIdActivesShowActives(id);

        if (!user) throw new ErrorBDEntityNotFound('User doesn\'t exist');
        let refreshTokenExists = await refreshToken.findOne(user._id);

        user.img = undefined;
        deleteFile(id, 'users', user.img);
        deleteFolder(id, 'users');
        user.active = false;
        user.email = user.email + '-' 
                     + crypto.randomBytes(12).toString('hex') + '-' 
                     + new Date().getMilliseconds();

        Promise.all([await user.save(), await refreshTokenExists.delete()]);

        return user;

    } catch(error) {
        throw error;
    }
}




module.exports = {
    createUser,
    updateUser,
    getUsers,
    getUserID,
    deleteUser
}
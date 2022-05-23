const bb  = require('bluebird')
const bcrypt = bb.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options){
 

   
    const SALT_FACTOR  =  8
    if(!user.changed('password')){
        console.log("not changed")
        return;
    }
    return bcrypt
            .genSaltAsync(SALT_FACTOR)
            .then(salt => bcrypt.hashAsync(user.password,salt, null))
            .then(hash => {
                user.setDataValue('password', hash)
            })
}
module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {

        email:{
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING}
        // ,{
        //     hooks: {
        //         beforeCreate: hashPassword,
        //         beforeUpdate: hashPassword,
        //         beforeSave: hashPassword
        //     }
        // }
    )
    User.prototype.comparePassword  = function (password) {
        return bcrypt.compareAsync(password, this.password)
    }
    return User
}

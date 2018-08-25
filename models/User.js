var bcrypt = require('bcrypt')

module.exports = function (sequelize, DataTypes) {
    
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.hook("beforeCreate", function (User) {
        User.password = bcrypt.hashSync(user.password, bcrypt.genSaltsync(10), null);
    });

    User.prototype.validPassword = function(password){
        return bcrypt.compareSync(password, this.password);
    };

    return User;

}




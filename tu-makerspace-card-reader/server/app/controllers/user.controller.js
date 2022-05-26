const db = require("../models");
const bcrypt = require('bcrypt');
const Users = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial



exports.create = (req, res) => {
    // Validate request
    console.log(req.body);
    if (!req.body.name || !req.body.splash || !req.body.email || !req.body.id || !req.body.user ) {
        
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a user
    const user = {
        name: req.body.name,
        splash: req.body.splash,
        email: req.body.email,
        fabTech: 0,
        mill: 0,
        lathe: 0,
        waterjet: 0,
        wood1: 0,
        wood2: 0,
        metal1: 0,
        metal2: 0,
        admin: 0,
        password: "",
        id: req.body.id,
    };
    const authUser = {
        id: req.body.user,

    }


    Users.findOne({ where: { id: authUser.id } })
        .then(usera => {
            if (usera.fabTech || usera.admin) {
                Users.create(user)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the User."
                        });
                    });
            }
            else {
                res.status(400).send({
                    message: "Incorrect Password or Credentials!"
                });
                return;
            }
        });

    // Save user in the database

};
// Retrieve all users from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    Users.findAll({ where: condition, attributes: { exclude: ['password'] } })
        .then(data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};
// Find a single user with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Users.findByPk(id)
        .then(data => {
            if (data) {
                data.password = data.password !== '';
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};
exports.findEmail = (req,res)=>{
    const email = req.params.email;
    Users.findOne({where:{email : email}, attributes: { exclude: ['password'] } })
        .then(data =>{
            if(data){
                res.send(data);
            }
            else{
                res.status(404).send({
                    message: `Cannot find User with email=${email}.`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Error retrieving User with email=" + email
            });
        })
}
// Update a user by the id in the request
exports.update = (req, res) => {
    if (!req.body.updatedUser|| !req.body.user || !req.body.authPassword) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const authUser = {
        id: req.body.user,
        password: req.body.authPassword
    }
    Users.findOne({ where: { id: authUser.id } })
        .then(usera => {
            bcrypt.compare(authUser.password, usera.password, function (err, result) {
                if (result == true && !(req.body.admin && !usera.admin) && !(req.body.fabTech && !usera.admin) && (usera.fabTech || usera.admin)) {
                    let user = req.body.updatedUser;
                    if (req.body.updatedUser.password) {
                        user.password = bcrypt.hashSync(req.body.updatedUser.password, 10);
                    }

                    const id = req.params.id;
                    Users.update(user, {
                        where: { id: id }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({
                                    message: "User was updated successfully."
                                });
                            } else {
                                res.send({
                                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Error updating User with id=" + id
                            });
                        });
                }
                else {
                    res.status(401).send({
                        message: "Incorrect Password or Higher permission required!"
                    });
                    return;
                }
            })
        });

};
// Delete a user with the specified id in the request
exports.delete = (req, res) => {


    if (!req.body.user || !req.body.authPassword) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const authUser = {
        email: req.body.user,
        password: req.body.authPassword
    }
    Users.findOne({ where: { email: authUser.email } })
        .then(usera => {
            bcrypt.compare(authUser.password, usera.password, function (err, result) {
                if (result == true) {
                    const id = req.params.id;
                    Users.destroy({
                        where: { id: id }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({
                                    message: "User was deleted successfully!"
                                });
                            } else {
                                res.send({
                                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Could not delete User with id=" + id
                            });
                        });
                }
                else {
                    res.status(400).send({
                        message: "Incorrect Password!"
                    });
                    return;
                }
            })
        });


};
// Delete all users from the database.
exports.deleteAll = (req, res) => {
    Users.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        });
};
// Find all fabtech users
exports.findAllFabtechs = (req, res) => {
    Users.findAll({ where: { fabTech: true }, attributes: { exclude: ['password'] } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving fabTechs."
            });
        });
};
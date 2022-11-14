const db = require("../models");
const bcrypt = require('bcrypt');

const Machines = db.machine;
const MachineLog = db.machineLog;
const Users = db.user;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    if (!req.body.name || !req.body.user || !req.body.authPassword) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const machine = {
        name: req.body.name,
        status: false,
        description: req.body.description,
        requiredTraining: req.body.requiredTraining,
        taggedOut: false,
        group: req.body.group

    }
    const authUser = {
        email: req.body.user,
        password: req.body.authPassword
    }
    Users.findOne({ where: { email: authUser.email } })
        .then(usera => {
            bcrypt.compare(authUser.password, usera.password, function (err, result) {
                if (result == true && (usera.admin)) {
                    Machines.create(machine)
                        .then(data => {
                            res.send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occured while creating the Machine"
                            });
                        });
                }
                else {
                    res.status(400).send({
                        message: "Incorrect Password or Credentials!"
                    });
                    return;
                }
            })
        });

};
exports.findAll = (req, res) => {
    const group = req.query.group;
    var condition = group ? { group: { [Op.like]: `%${group}%` } } : null;
    Machines.findAll({ where: condition })
        .then(data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Machines."
            });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;
    Machines.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Machine with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Machine with id=" + id
            });
        });
};

exports.update = (req, res) => {
    if (!req.body.user || !req.body.updatedMachine) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const authUser = {
        id: req.body.user,
    }
    Users.findOne({ where: { id: authUser.id } })
        .then(usera => {
                if (usera.fabTech) {
                    let machine = req.body.updatedMachine;
                    const id = req.params.id;
                    Machines.update(machine, {
                        where: { id: id }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({
                                    message: "Machine was updated successfully."
                                });
                                MachineLog.create({
                                    machineName: machine.name,
                                    machineId: machine.id,
                                    userId: usera.id,
                                    userName: usera.name,
                                    time: Date.now(),
                                    action: machine.taggedOut? "Tagged Out" :  machine.description.indexOf("Unlisted reason")===-1 ? "Reason Updated: " + machine.description : "Tagged In"
                                })
                            } else {
                                res.send({
                                    message: `Cannot update Machine with id=${id}. Maybe Machine was not found or req.body is empty!`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Error updating Machine with id=" + id
                            });
                        });
                }
                
        });

};
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    Machines.findAll({ where: condition })
        .then(data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Machines."
            });
        });
};
exports.findAllGroup = (req, res) => {
    Machines.findAll({ where: { group: req.params.group } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retreiving Machine group"
            });
        });
};

//URL is machine id, requires userID
exports.toggleMachine = (req, res) => {
    if (!req.body.userID) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const authUser = {
        id: req.body.userID
    }
    Machines.findByPk(req.params.id)
        .then(machine => {
            Users.findOne({ where: { id: authUser.id } })
                .then(user => {
                    if (user[machine.requiredTraining]) {
                        userName = user.name;
                        const userId = user.id;
                        user = req.body;
                        machine.status= !machine.status;
                        const id = req.params.id;
                        Machines.update(
                            {status: machine.status, lastUserName:userName},
                            {where: { id: machine.id }
                        })
                            .then(num => {
                                if (num == 1) {
                                    res.send({
                                        message: "Machine was updated successfully."
                                    });
                                    MachineLog.create({
                                        machineName: machine.name,
                                        machineId: machine.id,
                                        userId: userId,
                                        userName: userName,
                                        time: Date.now(),
                                        action: machine.status ? "Turned On" : "Turned Off"
                                    })

                                } else {
                                    res.send({
                                        message: `Cannot update Machine with id=${id}. Maybe Machine was not found or req.body is empty!`
                                    });
                                }
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: "Error updating Machine with id=" + id
                                });
                            });
                    }
                    else {
                        res.status(400).send({
                            message: "Insufficent Permission!"
                        });
                        return;
                    }
                });


        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Machine with id=" + id
            });
        });

};
exports.disableMachine = (req, res) => {
    Machines.findByPk(req.params.id)
        .then(machine => {
            if (machine.status) {
                machine.status = !machine.status
                Machines.update(
                    {status: machine.status},
                    {where: { id: machine.id }
                })
                    .then(num => {
                        if (num == 1) {
                            res.send({
                                message: "Machine was updated successfully."
                            });
                            MachineLog.create({
                                machineName: machine.name,
                                machineId: machine.id,
                                userId: 0,
                                userName: null,
                                time: Date.now(),
                                action: "Turned Off"
                            })
                        } else {
                            res.send({
                                message: `Cannot update Machine with id=${id}. Maybe User was not found or req.body is empty!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating Machine with id=" + id
                        });
                    });
            }
            else {
                res.status(200).send({
                    message: "Machine already disabled!"
                });
                return;
            }




        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Machine with id=" + id
            });
        });

};
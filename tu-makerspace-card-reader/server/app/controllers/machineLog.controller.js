const db = require("../models");

const MachineLog = db.machineLog;
const Op = db.Sequelize.Op;

exports.findMachineLogs = (req,res)=>{
    machineId = req.body.machineId? req.body.machineId : null;
    userId = req.body.userId? req.body.userId : null;
    user_Name = req.body.user_Name? req.body.user_Name : null;
    machineName = req.body.machineName? req.body.machineName : null;
    numLogs = req.body.numLogs <= 200 & req.body.numLogs>0 ? req.body.numLogs : 40;
    startFrom = req.body.startFrom > 0 ? req.body.startFrom : 0;
    
    // let andParams = [];

    // machineId? andParams.push(machineId:machineId)

    MachineLog.findAll({
        where: {
            [Op.and]: [
                machineId?{"machineId": machineId}:null,
                userId?{"userId": userId}:null,  
                user_Name?{'userName':{[Op.substring]: [user_Name]}}:null,
                machineName?{'machineName':{[Op.substring]: [machineName]}}:null
            ],
            
        },
        limit: numLogs,
        offset: startFrom,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving machine logs."
        });
    });
    
}

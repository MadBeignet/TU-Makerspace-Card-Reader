const db = require("../models");

const UserEditLog = db.userEditLog;
const Op = db.Sequelize.Op;

exports.findUserEditLogs = (req,res)=>{
    userId = req.body.userId? req.body.userId : null;
    user_Name = req.body.user_Name? req.body.user_Name : null;
    updatedById = req.body.updatedById? req.body.updatedById : null;
    updatedByName = req.body.updatedByName? req.body.updatedByName : null;
    numLogs = req.body.numLogs <= 200 & req.body.numLogs>0 ? req.body.numLogs : 40;
    startFrom = req.body.startFrom > 0 ? req.body.startFrom : 0;
    UserEditLog.findAll({
        where: {
            [Op.and]: [
                userId?{"userId": userId}:null,
                updatedById?{"updatedById": updatedById}:null,
                updatedByName?{'updatedByName':{[Op.substring]: [updatedByName]}}:null,
                user_Name?{'userName':{[Op.substring]: [user_Name]}}:null
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
            message: err.message || "Some error occurred while retrieving user edit logs."
        });
    });
    
}
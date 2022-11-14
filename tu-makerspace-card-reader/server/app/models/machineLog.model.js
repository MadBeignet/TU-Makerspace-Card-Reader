module.exports = (sequelize,Sequelize)=>{
    const MachineLog = sequelize.define("machineLog",{
        machineName: {
            type: Sequelize.STRING
        },
        machineId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.STRING
        },
        userName:{
            type: Sequelize.STRING
        },
        time: {
            type: Sequelize.DATE
        },
        action: {
            type: Sequelize.STRING
        }
    })
    return MachineLog;
};
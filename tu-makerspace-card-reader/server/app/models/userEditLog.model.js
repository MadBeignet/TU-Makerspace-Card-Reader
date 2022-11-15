module.exports = (sequelize,Sequelize)=>{
    const UserEditLog = sequelize.define("userEditLog",{
        userId: {
            type: Sequelize.STRING
        },
        userName: {
            type: Sequelize.STRING
        },
        updatedById: {
            type: Sequelize.STRING
        },
        updatedByName: {
            type: Sequelize.STRING
        },
        time: {
            type: Sequelize.DATE
        },
        action: {
            type: Sequelize.STRING
        },
        field: {
            type: Sequelize.STRING
        },
        oldValue: {
            type: Sequelize.STRING
        },
        newValue: {
            type: Sequelize.STRING
        }
    })
    return UserEditLog;
}
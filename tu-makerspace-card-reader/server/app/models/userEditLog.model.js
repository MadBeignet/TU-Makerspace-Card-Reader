module.exports = (sequelize,Sequelize)=>{
    const UserEditLog = sequelize.define("userEditLog",{
        userId: {
            type: Sequelize.INTEGER
        },
        userName: {
            type: Sequelize.STRING
        },
        updatedById: {
            type: Sequelize.INTEGER
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
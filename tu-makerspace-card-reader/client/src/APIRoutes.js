export function getUser(id) {
    return{
        method: 'get',
        url: '/api/users/' + id
        
    }
}
export function getUserEmail(email){
    return{
        method: 'get',
        url: '/api/users/email/' + email
        
    }
}
export function disableMachine(id) {
   return{
        method: 'get',
        url: "/api/machines/disable/" + id
    }
}
export function toggleMachine(machineid, userID) {
    return{
         method: 'put',
         data: { "userID": userID }, 
         url: "/api/machines/toggle/" + machineid
         
     }
 }
export function getAllMachines(machineGroup) {
    return{
        method:'get',
        url: "/api/machines/group/" + machineGroup
    }
}
export function getMachines() {
    return {
        method:'get',
        url: "/api/machines/",
    }
}
export function getFabTechs() {
    return {
        method: 'get',
        url: '/api/users/fabTech/',
      
    }
}
export function verifyUser(email, password) {
    return {
        method: 'put',
        data: { password: password },
        url: '/api/users/verifyuser/' + email,
    }
}
export function addUser(newUser) {
    return {
        method: 'post',
        data: {id: newUser.id, name: newUser.name, email: newUser.email, splash : newUser.splash, user: newUser.authID},
        url: '/api/users/'
    }
}
export function editUser(id, updatedUser, user) {
    return {
        method: 'put',
        data:{updatedUser: updatedUser, user: user},
        url: '/api/users/' + id
       
    }
}
export function editMachine(machineId, updatedMachine, authUser) {
    return {
        method: 'put',
        data:{updatedMachine: updatedMachine, user: authUser},
        url: '/api/machines/' + machineId
      
    }
}
export function getUserEditLogs(userId,user_Name,updatedById,updatedByName,numLogs,startFrom){ 
    userId = userId?userId:null;
    user_Name = user_Name?user_Name:null;
    updatedById = updatedById?updatedById:null;
    updatedByName = updatedByName?updatedByName:null;
    numLogs = numLogs?numLogs:null;
    startFrom = startFrom?startFrom:null;

    return{
        method:'post',
        data:{
            userId: userId,
            user_Name: user_Name,
            updatedById: updatedById,
            updatedByName: updatedByName,
            numLogs: numLogs,
            startFrom: startFrom
        },
        url: '/api/logs/userEditLogs'
    }
}
export function getMachineLogs(machineId,userId,user_Name,numLogs,startFrom){
    machineId = machineId?machineId:null;
    userId = userId?userId:null;
    user_Name = user_Name?user_Name:null;
    numLogs = numLogs?numLogs:null;
    startFrom = startFrom?startFrom:null;

    return{
        method:'post',
        data:{
            machineId: machineId,
            userId: userId,
            user_Name: user_Name,
            numLogs: numLogs,
            startFrom: startFrom
        },
        url: '/api/logs/machineLogs'
    }

}
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
export function getAllLogs() {
    return {
        method: 'get',
        url: '/api/logs/'
    }
}
module.exports = app => {
    const machineLogs = require("../controllers/machineLog.controller.js");
    const userEditLogs = require("../controllers/userEditLog.controller.js");
    var router = require("express").Router();
    router.post("/machineLogs",machineLogs.findMachineLogs);
    router.post("/userEditLogs",userEditLogs.findUserEditLogs);
    app.use('/api/logs',router);
};
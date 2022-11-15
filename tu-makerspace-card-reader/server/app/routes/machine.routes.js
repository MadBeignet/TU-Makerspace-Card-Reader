module.exports = app => {
    const machines = require("../controllers/machine.controller.js");
    var router = require("express").Router();

    router.post("/", machines.create);
    
    router.get("/", machines.findAll);
    
    router.get("/:id", machines.findOne);

    router.put("/:id", machines.update);

    router.get("/group/:group",machines.findAllGroup);

    router.put("/toggle/:id",machines.toggleMachine);

    router.get("/disable/:id",machines.disableMachine);
    
    router.get("/status/:id", machines.findAll);
    
    router.get("/taggedOut/:id", machines.findAll);

    app.use('/api/machines',router);
}
module.exports = {
    run: function(creep) {

        let droppedEnergy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);  
        if (droppedEnergy.length > 0) {
            creep.pickup(droppedEnergy[0]);
        }
        
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {

            var energystore = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (i) => ((i.structureType == STRUCTURE_CONTAINER || i.structureType == STRUCTURE_STORAGE) && i.store[RESOURCE_ENERGY] > 0) || (i.structureType == STRUCTURE_LINK && i.energy > 0)
               });
            if (energystore !== null) {
                 if (creep.withdraw(energystore, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                     creep.moveTo(energystore);
                }
            }
        }
    }
};
var roleBuilder = require('role.builder');

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
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            });

            if (structure != undefined) {
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else {
                roleBuilder.run(creep);
            }
        }
        else {
            var energystore = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER && 
                        i.store[RESOURCE_ENERGY] > 0 
               });
            var energystorage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_STORAGE && 
                        i.store[RESOURCE_ENERGY] > 0 
               });
            if (typeof energystore !== 'undefined') {
                if (creep.withdraw(energystore, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energystore);
                }
            }
            else{
                if (creep.withdraw(energystorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energystorage);
                }
            }
        }
    }
};




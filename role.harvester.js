
module.exports = {
    run: function(creep) {

        if (creep.ticksToLivenumber < 50){
            var energystorage = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_STORAGE && 
                        i.store[RESOURCE_ENERGY] > 0
            });
            if (typeof energystore !== 'undefined') {
                if (creep.withdraw(energystore, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energystore);
                }
            }
        }
        else {

            if (creep.memory.working == true && creep.carry.energy == 0) {
                creep.memory.working = false;
            }
            else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
                creep.memory.working = true;
            }
    
            if (creep.memory.working == true) {
                var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => s.energy < s.energyCapacity &&
                    (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_SPAWN)
                });
    
                if (structure) {
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                }
                var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => s.energy < s.energyCapacity && (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_TOWER)
                });
    
                if (structure) {
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                }
                else {
                    var bigasscontainer = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: (s) => s.store < s.storeCapacity
                    });
                }
            }
            else {
                var energystore = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (i) => i.structureType == STRUCTURE_CONTAINER && 
                            i.store[RESOURCE_ENERGY] > 0
                   });
                var energystorage = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
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
    }
};
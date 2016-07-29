
module.exports = {
    run: function(creep) {

        let droppedEnergy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);  
        if (droppedEnergy.length > 0) {
            creep.pickup(droppedEnergy[0]);
        }
        
        if (creep.ticksToLive < 50){
            var energystorage = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_STORAGE
            }); 
            console.log(energystorage);
            if (energystore !== null) {
                if (creep.transfer(energystorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energystorage);
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
                    (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN)
                });
    
                if (structure !== null) {
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                }
                else {
                    structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: (s) => s.energy < s.energyCapacity && s.structureType == STRUCTURE_TOWER
                    });
        
                    if (structure !== null) {
                        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(structure);
                        }
                    }
                    else {
                        var bigasscontainer = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                            filter: (s) => s.store < s.storeCapacity && s.structureType == STRUCTURE_STORAGE
                        });
                    }
                }
            }
            else {
                var energystore = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (i) => (i.structureType == STRUCTURE_CONTAINER || i.structureType == STRUCTURE_STORAGE) && 
                            i.store[RESOURCE_ENERGY] > 0
                   });

                if (energystore !== null) {
                    if (creep.withdraw(energystore, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(energystore);
                    }
                }
            }
        }
    }
};
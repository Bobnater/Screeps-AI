var roleBuilder = require('role.builder');

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
            if (typeof energystorage !== 'undefined' && energystorage !== null && energystorage[0] !== null) {
                if (creep.transfer(energystorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energystorage);
                }
            }
        }
        else {

            if (creep.memory.working === true && creep.carry.energy == 0) {
                creep.memory.working = false;
            }
            else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
                creep.memory.working = true;
            }
    
            if (creep.memory.working === true) {
                var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => s.energy < s.energyCapacity &&
                    (s.structureType === STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN)
                });
    
                if (typeof structure !== 'undefined' && structure !== null && structure[0] !== null) {
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                }
                else {
                    structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: (s) => s.energy < s.energyCapacity && (s.structureType == STRUCTURE_TOWER ) //|| s.structureType == STRUCTURE_LINK)
                    });

                    var bigasscontainer = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                            filter: (s) => s.structureType == STRUCTURE_STORAGE && _.sum(s.store) < s.storeCapacity
                    });

                    if (typeof structure !== 'undefined' && structure !== null && structure[0] !== null) {
                        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(structure);
                        }
                    }
                    else if (!!bigasscontainer) {
                            if (creep.transfer(bigasscontainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(bigasscontainer);
                            }
                    }
                }
            }
            else {
                var container = Game.getObjectById(creep.memory.container.id);
                var energystore = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (i) => i.structureType == STRUCTURE_STORAGE && i.store[RESOURCE_ENERGY] > 0
                   });
                if (container.store[RESOURCE_ENERGY] > 0){
                    if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
                }
                else if (!!energystore) {
                    if (creep.withdraw(energystore, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(energystore);
                    }
                }

            }
        }

        let repairtarget = creep.pos.findInRange(FIND_STRUCTURES,3, { Filter: (s) => s.structureType === STRUCTURE_ROAD && s.hits < s.hitsMax});
        if (repairtarget.length > 0) {
            creep.repair(repairtarget[0]);
        }
    }
};
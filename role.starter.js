var roleRepairer = require('role.repairer');

module.exports = {
    run: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => s.energy < s.energyCapacity
            });

            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, {ignoreCreeps:true});
                }
            }
            else if (Game.spawns.Spawn1.energy == 300){
                roleRepairer.run(creep);
            }

            else if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.Spawn1, {ignoreCreeps:true});
            }
        }
        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            var energystore = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER && 
                        i.store[RESOURCE_ENERGY] > 100 
               });
            if (creep.withdraw(energystore, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(energystore, {ignoreCreeps:true});
            }
            else if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {ignoreCreeps:true});   
            }
        }
    }
};
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleMiner = require('role.miner');
var roleStarter = require('role.starter');
var roleDefender = require('role.defender');
var roleAttacker = require('role.attacker');
var roleRangedDefender = require('role.rangeddefender');
var name = undefined;



module.exports.loop = function () {

    var minimumNumberOfMiners = 2;
    var minimumNumberOfHarvesters = 2;
    var minimumNumberOfUpgraders = 1;
    var minimumNumberOfBuilders = 1;
    var minimumNumberOfRepairers = 0;
    var minimumNumberOfDefenders = 2;
    var minimumNumberOfRangedDefenders = 1;
    var numberOfMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner');
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
    var numberOfDefenders = _.sum(Game.creeps, (c) => c.memory.role == 'defender');
    var numberOfRangedDefenders = _.sum(Game.creeps, (c) => c.memory.role == 'rangeddefender');

    for (var i in Memory.creeps){
        if (!Game.creeps[i]) {
            if(Memory.creeps[i].source){
                Memory.rooms[Memory.creeps[i].room.name].sources.push(Memory.creeps[i].source);
            }
            delete Memory.creeps[i];
        }
    }


    for (let curroom in Game.rooms) {

//        Linksinroom = Memory.rooms[curroom].links = Game.rooms[curroom].find(FIND_MY_STRUCTURES, {
//                          filter: (i) => i.structureType == STRUCTURE_LINK && 
//                                        i.energy > 500 
//        });
//
//
//        if(typeof Memory.rooms[curroom].links === 'undefined' || Linksinroom !== Memory.rooms[curroom].links) {
//            Memory.rooms[curroom].links = Linksinroom
//            
//            console.log('Found links in room '+curroom+', they have been logged.');
//            console.log(Memory.rooms[curroom].links);
//        }
//
//        if(typeof Memory.rooms[curroom].sources === 'undefined') {
//            Memory.rooms[curroom].sources = Game.rooms[curroom].find(FIND_SOURCES);
//            console.log('Found sources in room '+curroom+', they have been logged.');
//            console.log(Game.rooms[curroom].find(FIND_SOURCES));
//            console.log(Memory.rooms[curroom].sources)
//        }
//
//        for(let link in Memory.rooms[curroom].links){
//          if(typeof link.role === 'undefined') {
//
//          }
//          if (link.role === 'sender'){
//
//          }
//        }


        Game.rooms[curroom].creepbodies = {defendbody:undefined,minerbody:undefined,transbody:undefined,harvestbody:undefined,rangedbody:undefined}
        if (Game.rooms[curroom].memory.currentcap === undefined) {
            Game.rooms[curroom].memory.currentcap = 10;
        }
        if (Game.rooms[curroom].energyCapacityAvailable !== Game.rooms[curroom].memory.currentcap){ 
            
            Game.rooms[curroom].memory.defendbody = [];
            Game.rooms[curroom].memory.minerbody = [MOVE,CARRY,MOVE,MOVE];
            Game.rooms[curroom].memory.transbody = [];
            Game.rooms[curroom].memory.harvestbody = [];
            Game.rooms[curroom].memory.rangedbody = [];
    
            Game.rooms[curroom].memory.currentcap = Game.rooms[curroom].energyCapacityAvailable;
            var transparts = Math.floor(Game.rooms[curroom].energyCapacityAvailable/200);
            for(let i = 0; i < transparts; i++){
                Game.rooms[curroom].memory.transbody.push (WORK,CARRY,MOVE)
            }
    
            var minerparts = Math.min(Math.floor((Game.rooms[curroom].energyCapacityAvailable - 200)/100), 8);
            for(let i = 0; i < minerparts; i++){
                Game.rooms[curroom].memory.minerbody.push (WORK)
            }
    
            var defendparts = Math.floor(Game.rooms[curroom].energyCapacityAvailable/150);
            for(let i = 0; i < defendparts; i++){
                Game.rooms[curroom].memory.defendbody.push (TOUGH,TOUGH)
            }
            for(let i = 0; i < defendparts; i++){
                Game.rooms[curroom].memory.defendbody.push (MOVE)
            }
            for(let i = 0; i < defendparts; i++){
                Game.rooms[curroom].memory.defendbody.push (ATTACK)
            }
    
            var harvestparts = Math.min(Math.floor(Game.rooms[curroom].energyCapacityAvailable/150),8);
            for(let i = 0; i < harvestparts; i++){
                Game.rooms[curroom].memory.harvestbody.push (CARRY,CARRY,MOVE)
            }
    
            var rangedparts = Math.floor(Game.rooms[curroom].energyCapacityAvailable/260);
            for(let i = 0; i < rangedparts; i++){
                Game.rooms[curroom].memory.rangedbody.push (TOUGH)
            }
            for(let i = 0; i < rangedparts; i++){
                Game.rooms[curroom].memory.rangedbody.push (MOVE,MOVE)
            }
            for(let i = 0; i < rangedparts; i++){
                Game.rooms[curroom].memory.rangedbody.push (RANGED_ATTACK)
            }
    
    
            console.log('New Miner chassi = '+Game.rooms[curroom].memory.minerbody);
            console.log('New Transport chassi = '+Game.rooms[curroom].memory.transbody);
            console.log('New Defender chassi = '+Game.rooms[curroom].memory.defendbody);
            console.log('New Harvest chassi = '+Game.rooms[curroom].memory.harvestbody);
            console.log('New Ranged chassi = '+Game.rooms[curroom].memory.rangedbody);
            console.log('Stored room capacity '+Game.rooms[curroom].memory.currentcap);
            console.log('Actual room capacity ' +Game.rooms[curroom].energyCapacityAvailable);
    
        }

        if ((Object.keys(Game.creeps).length) < 2){
            name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE], null,
                { role: 'starter', working: false});
        }
        if (Game.spawns.Spawn1.canCreateCreep(Game.rooms[curroom].memory.minerbody, null) === 0) {

           if (numberOfMiners < 1 && !(Game.rooms[curroom].memory.sources === [])) {
               name = Game.spawns.Spawn1.createCreep(Game.rooms[curroom].memory.minerbody, null,
                   { role: 'miner', working: false, readytomine: false, room: Game.rooms[curroom], source: Game.rooms[curroom].memory.sources.pop()});
           }
           else if (numberOfHarvesters < minimumNumberOfHarvesters) {
               name = Game.spawns.Spawn1.createCreep(Game.rooms[curroom].memory.harvestbody, null,
                   { role: 'harvester', working: false});
           }
           else if (numberOfDefenders < 1) {
               name = Game.spawns.Spawn1.createCreep(Game.rooms[curroom].memory.defendbody, null,
                   { role: 'defender', working: false});
           }
           else if (numberOfMiners < minimumNumberOfMiners && !(Game.rooms[curroom].memory.sources === [])) {
               name = Game.spawns.Spawn1.createCreep(Game.rooms[curroom].memory.minerbody, null,
                   { role: 'miner', working: false, readytomine: false, room: Game.rooms[curroom], source: Game.rooms[curroom].memory.sources.pop()});
           }
           else if (numberOfUpgraders < minimumNumberOfUpgraders) {
               name = Game.spawns.Spawn1.createCreep(Game.rooms[curroom].memory.transbody, null,
                   { role: 'upgrader', working: false,});
           }
           else if (numberOfBuilders < minimumNumberOfBuilders) {
               name = Game.spawns.Spawn1.createCreep(Game.rooms[curroom].memory.transbody, null,
                   { role: 'builder', working: false});
           }
           else if (numberOfRepairers < minimumNumberOfRepairers) {
               name = Game.spawns.Spawn1.createCreep(Game.rooms[curroom].memory.transbody, null,
                   { role: 'repairer', working: false});
           }
           else if (numberOfDefenders < minimumNumberOfDefenders) {
               name = Game.spawns.Spawn1.createCreep(Game.rooms[curroom].memory.defendbody, null,
                   { role: 'defender', working: false});
           }
           else if (numberOfRangedDefenders < minimumNumberOfRangedDefenders) {
               name = Game.spawns.Spawn1.createCreep(Game.rooms[curroom].memory.rangedbody, null,
                   { role: 'rangeddefender', working: false});
           }
           else if (Game.rooms[curroom].energyAvailable === (Game.rooms[curroom].energyCapacityAvailable - 400)) {
               name = Game.spawns.Spawn1.createCreep([MOVE], null,
                   { role: 'attacker', working: false});
           }

           if (!(name < 0) && !(name == undefined)) {
               console.log("Spawned new creep: " + name);
           }

        }

    }



    



        var towers = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, { filter: function(object) {
            return object.structureType == STRUCTURE_TOWER;
        }
        });
    for (let key in towers){
        var tower = towers[key];
        var thingtoshoot = tower.pos.findInRange(FIND_HOSTILE_CREEPS, 7);
        var thingtoheal = tower.pos.findInRange(FIND_MY_CREEPS, 7, { filter: function(c) { 
            return (c.hits < c.hitsMax);
        }
        });
        if (typeof thingtoshoot[0] !== 'undefined'){
            tower.attack(thingtoshoot[0]);
            var username = thingtoshoot[0].owner.username;
            Game.notify('User '+ username + ' spotted in room');
        }
        else if (typeof thingtoheal[0] !== 'undefined') {
            tower.heal(thingtoheal[0]);
        }
        else if (tower.energy > 900 && Object.keys(Game.creeps).length > 5) {
            var thingtorepair = tower.pos.findInRange(FIND_STRUCTURES,23, { filter: function(c) { 
                return (c.hits < (c.hitsMax - 400));
            }
            });
            tower.repair(thingtorepair[0]);
        }
    }




    for (let name in Game.creeps) {

        var creep = Game.creeps[name];
        if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        } 
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        else if (creep.memory.role == 'starter') {
            roleStarter.run(creep);
        }
        else if (creep.memory.role == 'defender') {
            roleDefender.run(creep);
        }
        else if (creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }
        else if (creep.memory.role == 'rangeddefender') {
            roleRangedDefender.run(creep);
        }
    }

};
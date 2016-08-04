module.exports = {
    run: function(creep) {
        var walltarget =[];
        var spawntarget =[];
        var creeptarget =[];

        spawntarget = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);
        creeptarget = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        walltarget = creep.pos.findClosestByRange(FIND_STRUCTURES);
        if(spawntarget === null) {
            var right = creep.pos.findClosestByRange(FIND_EXIT_RIGHT);
            var up = creep.pos.findClosestByRange(FIND_EXIT_TOP);
            var down = creep.pos.findClosestByRange(FIND_EXIT_BOTTOM);
            var left = creep.pos.findClosestByRange(FIND_EXIT_LEFT);   
            if(!(left == undefined)){
                creep.moveTo(left);
            } 
           else if(!(up == undefined)){
               creep.moveTo(up);
           } 
           else if(!(down == undefined)){
               creep.moveTo(down);
           } 
        }
        else if(spawntarget[0] !== null) {
            creep.moveTo(spawntarget)
        }
        else if(creeptarget[0] !== null) {
            creep.moveTo(creeptarget)
        }
        else if(walltarget[0] !== null) {
            creep.moveTo(walltarget)
        }
        creep.attack(spawntarget);
        creep.attack(creeptarget);
        if(Game.rooms[creep.pos.roomName].controller.owner.username !== 'Kartith') {
            creep.attack(walltarget);
            Game.notify('Im hitting walls in room owned by ' +Game.rooms[creep.pos.roomName].controller.owner);
        }
    }
};
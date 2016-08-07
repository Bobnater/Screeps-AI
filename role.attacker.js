module.exports = {
    run: function(creep) {
        var walltarget =[];
        var spawntarget =[];
        var creeptarget =[];
        spawntarget = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);
        creeptarget = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        walltarget = creep.pos.findClosestByRange(FIND_STRUCTURES);

        var attackflags = _.filter((Game.flags), function(i) { return (i.name === 'Attack'); });
        if (attackflags[0].pos.roomName !== creep.pos.roomName) {
            creep.moveTo(attackflags[0]);
        }
        else if(!!spawntarget) {
            creep.moveTo(spawntarget)
        }
        else if(!!creeptarget) {
            creep.moveTo(creeptarget)
        }
        else if(!!walltarget) {
            creep.moveTo(walltarget)
        }
        creep.attack(spawntarget);
        creep.attack(creeptarget);
        console.log(!walltarget);
        if(!!Game.rooms[creep.pos.roomName].controller && Game.rooms[creep.pos.roomName].controller.owner.username !== 'Kartith' && !creeptarget && !spawntarget) {
            creep.attack(walltarget);
            Game.notify('Im hitting walls in room owned by ' +Game.rooms[creep.pos.roomName].controller.owner);
        }
    }
};
module.exports = {
    run: function(creep) {
        var spawntarget =[];
        creeptarget = creep.pos.findInRange(FIND_HOSTILE_CREEPS,6);

        var keeperflags = _.filter((Game.flags), function(i) { return (i.name === 'sourceKeeper'); });

        if (creep.memory.inPosition) {
            if(_.sum(creep.body, function(i) { return (i === TOUGH); }) === 0){
                var runningPath = PathFinder.search(creep.pos, {pos: creeptarget.pos, range: 4}, {flee:true});
                creep.moveByPath(runningPath.path);
            }
            else{
                var attackPath = PathFinder.search(creep.pos, {pos: creeptarget.pos, range: 3});
                creep.moveByPath(attackPath.path);
            }
        }
        else {
            creep.moveTo(keeperflags[0]);
            if(creep.pos.getRangeTo(keeperflags[0].pos.roomName) < 5) {
                creep.memory.inPosition = true
            }
        }
        creep.rangedAttack(creeptarget);
        creep.heal(creep);
    }
};
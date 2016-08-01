module.exports = {
    run: function(creep) {

        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target !== null){
            if(creep.pos.getRangeTo(target) < 3) {
                var runningPath = PathFinder.search(creep.pos, {pos: target.pos, range: 3}, {flee:true})
                creep.moveByPath(runningPath.path);
    
            }
            else if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                console.log('attacking');
                creep.moveTo(target);

            }
        }
        else {
            creep.moveTo(36,30);
        }

    }
};
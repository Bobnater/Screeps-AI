module.exports = {
    run: function(creep) {

        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);

            }
        }
        else {
            creep.moveTo(4,15);
        }

        if (creep.ticksToLive < 100){
            Memory.creeps[creep.name].role = 'attacker';
        }
    }
};
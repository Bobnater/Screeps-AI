module.exports = {
    run: function(creep) {

        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target !== null){
            if(creep.pos.getRangeTo(target) < 3) {
                var direction = creep.pos.getDirectionTo(target);
                var run = null;
                if(direction <= 4){
                        run = (direction + 4);
                    }
                else {
                    run = (direction - 4);
                }
    
                creep.move(run);
    
            }
            else if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);

            }
        }
        else {
            creep.moveTo(36,30);
        }

    }
};
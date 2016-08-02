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
            if(!(right == undefined)){
                creep.moveTo(right);
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
        creep.attack(walltarget);

    }
};
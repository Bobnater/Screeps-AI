module.exports = {
    run: function(creep) {


        var spawntarget = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);
        var creeptarget = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var walltarget = creep.pos.findClosestByRange(FIND_STRUCTURES);

        if(spawntarget == undefined) {
            var right = creep.pos.findClosestByRange(FIND_EXIT_RIGHT);
            var up = creep.pos.findClosestByRange(FIND_EXIT_TOP);
            var down = creep.pos.findClosestByRange(FIND_EXIT_BOTTOM);  
            if(!(right == undefined)){
                creep.moveTo(right);
            } 
           else if(!(down == undefined)){
               creep.moveTo(down);
           } 
           else if(!(down == undefined)){
               creep.moveTo(down);
           } 
        }
        else if(creep.moveTo(spawntarget) > -1 && !(spawntarget == undefined)) {
            if(creep.rangedAttack(spawntarget) == ERR_NOT_IN_RANGE) {

            }
        }
        else if(creep.moveTo(creeptarget) > -1 && !(creeptarget == undefined)) {
            if(creep.rangedAttack(creeptarget) == ERR_NOT_IN_RANGE) {

            }
        }
        else if(creep.moveTo(walltarget) > -1 && !(walltarget == undefined)) {
            if(creep.rangedAttack(walltarget) == ERR_NOT_IN_RANGE) {

            }
        }


    }
};
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
           else if(!(up == undefined)){
               creep.moveTo(up);
           } 
           else if(!(down == undefined)){
               creep.moveTo(down);
           } 
        }
        else if(creep.moveTo(spawntarget) > -1 && !(spawntarget == undefined)) {

        }
        else if(creep.moveTo(creeptarget) > -1 && !(creeptarget == undefined)) {

        }
        else if(creep.moveTo(walltarget) > -1 && !(walltarget == undefined)) {

        }
        creep.attack(spawntarget);
        creep.attack(creeptarget);
        creep.attack(walltarget);

    }
};
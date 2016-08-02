module.exports = {
    run: function(creep) {



        var friendly = creep.pos.findClosestByRange(FIND_MY_CREEPS, { filter: (c) => c.hits < c.hitsMax});

        if (creep.hits < creep.hitsMax) {
          creep.heal(creep);
        }
        else if (typeof friendly !== 'undefined' && friendly[0] !== null ){
          var range = creep.getRangeTo(friendly);
          if(range === 2 ){
            creep.moveTo(friendly);
            creep.heal(friendly);
          } 
          if (range > 2){
            creep.moveTo(friendly);
            creep.rangedHeal(friendly);
          }
          if (range === 1){
            creep.heal(friendly);
          }
        }
        else {

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
    }
};
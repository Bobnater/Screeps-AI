module.exports = {

	run: function(creep) {


		console.log(creep.pos.roomname);
		console.log(creep.memory.source.room.name);

		if(creep.pos.roomname === creep.memory.source.room.name){
			var source = Game.getObjectById(creep.memory.source.id);
       		var energystore = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER
               });
        	var workparts = Object.keys(_.filter(creep.body,{'type':'work'})).length;

            if (creep.pos.getRangeTo(source) > 1) {
	            creep.memory.readytomine = false;
	        }


        	if (creep.memory.readytomine){

        		var site = creep.pos.findInRange(FIND_CONSTRUCTION_SITES,3);

	       		if (creep.carry[RESOURCE_ENERGY] >= (creep.carryCapacity-(workparts*2))){
	        		creep.build(site);
	    		}
	
	    		if (creep.carry[RESOURCE_ENERGY] == 0){
	        		creep.memory.working = false;
	    		}

				if (creep.carry[RESOURCE_ENERGY] >= (creep.carryCapacity-(workparts*2))){
	        		creep.transfer(energystore, RESOURCE_ENERGY)
	        	
	        	}

	    		if (_.sum(energystore.store) < 2000 || typeof site !== 'undefined'){
	    			creep.harvest(source);
	    		}

    		}
    		else {

    			if (creep.pos.getRangeTo(source) == 1) {
	            	creep.memory.readytomine = true;
	      		}

	        	else{
	            	creep.moveTo(source); 
	        	}

    		}
		}
		else {
			creep.moveTo(creep.memory.source.pos);
		}
	}
};

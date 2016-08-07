module.exports = {

	run: function(creep) {

		var remotemineflags = _.filter((Game.flags), function(i) { return _.startsWith(i.name,'remoteMine') });
		var creeptarget = creep.pos.findInRange(FIND_HOSTILE_CREEPS,6);

		if(!!creeptarget && !!creeptarget[0]){
			var runningPath = PathFinder.search(creep.pos, {pos: creeptarget.pos, range: 4}, {flee:true});
                creep.moveByPath(runningPath.path);
		}
		else {

			if(creep.pos.roomName === Game.flags[remotemineflags[0]].pos){
				var source = Game.findInRange(FIND_SOURCES,1);
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
		
	    			if (creep.carry[RESOURCE_ENERGY] === 0){
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
	
    				if (creep.pos.getRangeTo(source) === 1) {
	    	        	creep.memory.readytomine = true;
	    	  		}
	
	    	    	else{
	    	        	creep.moveTo(source); 
	    	    	}
	
    			}
			}
			else {
				creep.moveTo(Game.flags[remotemineflags[0]].pos);
			}
		}
	}	
};

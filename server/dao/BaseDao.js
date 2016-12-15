'use strict';
var fs = require('fs');

class BaseDao{

	constructor(entity){
		this._cache = [];
		this._entity = entity;
		this._seq = 1;
		var dao = this;

		try{
			fs.readFile("./server/data/data-" + entity + ".json" ,'utf-8', function(err,data){
				if(!err){
					var arr = JSON.parse(data);
					dao._cache = Object.assign([], arr);
					dao._seq = arr.length;
				}
			});
		}catch(e){
			console.log(e);
		}
	}

	get(key){
		for(var i = 0; i < this._cache.length; i++){
			var obj = this._cache[i];
			if(obj.id == parseInt(key)){
				return Object.assign({}, obj);
			}
		}
	}

	// create an entity, and return id.
	create(dataEntity){
		var entity = Object.assign({}, dataEntity);
		entity["id"] = getSeq.call(this);
		this._cache.push(entity);
		return entity.id;
	}

	update(dataEntity){
		var entity = Object.assign({}, dataEntity);
		if(entity.id){
			for(var i = 0; i < this._cache.length; i++){
				var obj = this._cache[i];
				if(obj.id == entity.id){
					this._cache[i] = Object.assign(obj, entity);
				}
			}
		}
		return entity.id;
	}

	delete(key){
		if(key){
			for(var i = 0; i < this._cache.length; i++){
				var obj = this._cache[i];
				if(obj.id == parseInt(key)){
					this._cache.splice(i, 1);
				}
			}
		}
	}

	list(){
		return Object.assign([], this._cache);
	}	
}

// --------- BaseDao Utilities --------- //

function getSeq(){
	return this._seq++;
}

// --------- /BaseDao Utilities --------- //

module.exports = BaseDao;




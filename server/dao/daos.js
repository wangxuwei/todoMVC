'use strict';
var BaseDao = require("./BaseDao.js");

module.exports = {
	BaseDao: BaseDao,
	task: new BaseDao("task")
};

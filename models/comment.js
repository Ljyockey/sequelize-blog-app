'use strict';

const Sequelize = require('sequelize');
const {sequelize} = require('../db/sequelize');

const Comment = sequelize.define('Comment', {
	//table models
	},
	{
	//options
	});

module.exports = {Comment};
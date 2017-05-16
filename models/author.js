'use strict';

const Sequelize = require('sequelize');
const {sequelize} = require('../db/sequelize');

const Author = sequelize.define('Author', {
		//table models
	},
	{
		//options
	});

module.exports = {Author};
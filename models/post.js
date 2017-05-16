'use strict';

const Sequelize = require('sequelize');
const {sequelize} = require('../db/sequelize');

const Post = sequelize.define('Post', {
	//table models
	}, 
	{
		//options
	});


module.exports = {Post};
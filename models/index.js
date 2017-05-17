'use strict';

const {Author} = require('./author');
const {Comment} = require('./comment');
const {Post} = require('./post');

const db = {Author, Post, Comment};

Object.keys(db).forEach(function(model) {
	if (db[model].associate) {
		db[model].associate(db);
	}
});

module.exports = db;
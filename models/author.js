'use strict';

const Sequelize = require('sequelize');
const {sequelize} = require('../db/sequelize');

const Author = sequelize.define('Author', {
		firstName: {
			type: Sequelize.TEXT,
			field: 'first_name'
		},
		lastName: {
			type: Sequelize.TEXT,
			field: 'last_name'
		},
		username: {
			type: Sequelize.TEXT,
			allowNull: false,
			validate: {
				notNull: true
			}
		}
	},
	{
		tableName: 'authors',
		underscored: true,
		classMethods: {
			associate: function(models) {
				Author.hasMany(models.Post, {
					as: 'posts',
					foreignKey: {
						allowNull: false
					}
				});
				Author.hasMany(models.Comment, {
					as: 'comments',
					foreignKey: {
						allowNull: false
					},
					onDelete: 'CASCADE'
				});
			}
		},
		instanceMethods: {
			apiRepr: function() {
				return {
					id: this.id,
					firstName: this.firstName,
					lastName: this.lastName,
					username: this.username
				};
			}
		}
	}
	);

module.exports = {Author};
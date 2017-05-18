'use strict';

const Sequelize = require('sequelize');
const {sequelize} = require('../db/sequelize');

const Comment = sequelize.define('Comment', {
		commentText: {
			type: Sequelize.TEXT,
			field: 'comment_text',
			validate: {
				allowNull: false
			}
		}
	},
	{
		tableName: 'comments',
		underscored: true,
		classMethods: {
			associate: function(models) {
				Comment.belongsTo(models.Author, {
					foreignKey: {
						allowNull: false
					},
					onDelete: 'CASCADE'
				});
				Comment.belongsTo(models.Post, {
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
					commentText: this.commentText
				};
			}
		}
	}
	);

module.exports = {Comment};
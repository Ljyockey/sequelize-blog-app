'use strict';

const Sequelize = require('sequelize');
const {sequelize} = require('../db/sequelize');

const Post = sequelize.define('Post', {
		title: {
			type: Sequelize.TEXT,
			allowNull: false
		},
		content: {
			type: Sequelize.TEXT
		}
	}, 
	{
		tableName: 'posts',
		underscored: true,
		classMethods: {
			associate: function(models) {
				Post.belongsTo(models.Author, {
					foreignKey: {
						allowNull: false
					},
				}
				);
				Post.hasMany(models.Comment, {
					as: 'comments',
					foreignKey: {
						allowNull: false
					},
					onDelete: 'CASCADE'
				}
				);
			}
		},
		instanceMethods: {
			apiRepr: function() {
				return {
					id: this.id,
					title: this.title,
					content: this.content,
					author_id: this.author_id
				};
			}
		}
	}
	);


module.exports = {Post};
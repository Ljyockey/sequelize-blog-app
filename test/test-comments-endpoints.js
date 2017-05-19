const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const should = chai.should();
const app = require('../app');
const {Comment, Author, Post} = require('../models');
const {buildAuthor, buildPost, buildComment, dropTables, seedTestData} = require('./helper');

chai.use(chaiHttp);

describe('Comments API resource', function() {

	beforeEach(function() {
		return dropTables()
		.then(function() { 
			return seedTestData();
		});
	});

	describe('POST endpoint: comments', function() {

		it('should create a new comment', function() {
			let post;
			const newComment = {commentText: 'foo fizz bar'};
			return Post.findOne()
			.then(function(_post) {
				post = _post;
				newComment.author_id = post.author_id;
				newComment.post_id = post.id;
				return chai.request(app)
				.post('/comments').send(newComment)
			})
			.then(function(res) {
				res.should.have.status(201);
				res.body.should.be.a('object');
			});
		});
	});

	describe('PUT endpoints: comments', function() {
		it('should update a comment', function() {
			let comment;
			const newComment = {commentText: 'bizz'};
			return Comment.findOne()
			.then(function(_comment) {
				comment = _comment;
				newComment.id = comment.id;
				return chai.request(app)
				.put(`/comments/${comment.id}`).send(newComment)
			})
			.then(function(res) {
				res.should.have.status(204);
				return Comment.findById(comment.id)
			})
			.then(function(comment) {
				comment.commentText.should.equal(newComment.commentText);
			});
		});
	});

	describe('DELETE endpoint: comments', function() {

		it('should delete comment', function() {
			let comment;
			return Comment.findOne()
			.then(function(_comment) {
				comment = _comment;
				return chai.request(app)
				.delete(`/comments/${comment.id}`)
			})
			.then(function(res) {
				res.should.have.status(204);
				return Comment.findById(comment.id)
			})
			.then(function(_comment) {
				should.not.exist(_comment);
			});
		});
	});


});


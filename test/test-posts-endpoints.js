const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const should = chai.should();
const app = require('../app');
const {Comment, Author, Post} = require('../models');
const {buildAuthor, buildPost, buildComment, dropTables, seedTestData} = require('./helper');

chai.use(chaiHttp);

describe('Posts API resource', function() {

	beforeEach(function() {
		return dropTables()
		.then(function() { 
			return seedTestData();
		});
	});

	describe('GET endpoints: posts', function() {

		it('should return all posts', function() {
			let postCount;
			return Post.findAndCountAll()
		.then(function(post) {
			postCount = post.count;
			return chai.request(app)
			.get('/posts')
		})
		.then(function(res) {
			res.should.have.status(200);
			res.body.posts.should.be.a('array');
			res.body.posts.length.should.equal(postCount);
			});
		});

		it('should return post comments by post ID', function() {
			let post;
			return Post.findOne()
			.then(function(_post) {
				post = _post;
				return chai.request(app)
				.get(`/posts/${post.id}/comments`)
			})
			.then(function(res) {
				res.should.have.status(200);
				res.body.comments.forEach(function(item) {
					item.post_id.should.equal(post.id);
				});
			});
		});

	});

	describe('POST endpoint: posts', function() {

		it('should add a new post', function() {
			const newPost = {
				title: 'fizz bar',
				content: 'krvbqlkerhq qwuevqrb; qliuvqiubv'
			};
			return Author.findOne()
			.then(function(author) {
				newPost.author_id = author.id;
				return chai.request(app)
				.post('/posts').send(newPost)
			})
			.then(function(res) {
				res.should.have.status(201);
				res.body.title.should.equal(newPost.title);
				res.body.content.should.equal(newPost.content);
				res.body.author_id.should.equal(newPost.author_id);
			});
		});
	});

	describe('PUT endpoint: posts', function() {

		it('should update post', function() {
			let post;
			const updateItems = {
				title: 'bang',
				content: 'fkwvbbqwv qwevbqwev liweqv'
			};
			return Post.findOne()
			.then(function(_post) {
				post = _post;
				updateItems.id = post.id;
				return chai.request(app)
				.put(`/posts/${post.id}`).send(updateItems)
			})
			.then(function(res) {
				res.should.have.status(204);
				return Post.findOne({where: {id: post.id}})
			})
			.then(function(_post) {
				_post.id.should.equal(updateItems.id);
				_post.title.should.equal(updateItems.title);
				_post.content.should.equal(updateItems.content);
			});
		});
	});

	describe('DELETE endpoint: posts', function() {

		it('should remove post', function() {
			let post;
			return Post.findOne()
			.then(function(_post) {
				post = _post;
				return chai.request(app)
				.delete(`/posts/${post.id}`)
			})
			.then(function(res) {
				res.should.have.status(204);
				return Post.findOne({where:{id:post.id}})
			})
			.then(function(_post) {
				should.not.exist(_post);
			});
		});
	});


});


const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const should = chai.should();
const app = require('../app');
const {Comment, Author, Post} = require('../models');
const {buildAuthor, buildPost, buildComment, dropTables, seedTestData} = require('./helper');

chai.use(chaiHttp);


describe('Authors API resource', function() {

	beforeEach(function() {
		return dropTables()
		.then(function() { 
			return seedTestData();
		});
	});

	describe('GET endpoints: authors', function() {

		it('should return author by ID', function() {
			let author;
			return Author.findOne()
			.then(function(_author) {
				author = _author;
				return chai.request(app)
				.get(`/authors/${author.id}`)
			})
			.then(function(res) {
				res.should.have.status(200);
				res.body.id.should.equal(author.id);
			});
		});

		it('should return posts by author ID', function() {
			let author;
			return Author.findOne()
			.then(function(_author) {
				author = _author;
				return chai.request(app)
				.get(`/authors/${author.id}/posts`)
			})
			.then(function(res) {
				res.should.have.status(200);
			});
		});

	});

	describe('POST endpoint: authors', function() {

		it('should create a new author', function() {
			const newAuthor = {
				firstName: 'Jane',
				lastName: 'Doe',
				username: 'JaneDoe'
			};
			return chai.request(app)
			.post('/authors').send(newAuthor)
			.then(function(res) {
				res.should.have.status(201);
				return Author.findOne({where: {id: res.body.id}})
			})
			.then(function(auth) {
				auth.firstName.should.equal(newAuthor.firstName);
				auth.lastName.should.equal(newAuthor.lastName);
				auth.username.should.equal(newAuthor.username);
			});
		});
	});

	describe('PUT endpoint: authors', function() {

		it('should update an author', function() {
			let author;
			const changes = {
				firstName: 'Joe',
				lastName: 'Smith',
				username: 'joesmith'
			};
			return Author.findOne()
			.then(function(_author) {
				author = _author;
				changes.id = author.id;
				return chai.request(app)
				.put(`/authors/${author.id}`).send(changes)
			})
			.then(function(res) {
				res.should.have.status(204);
				return chai.request(app)
				.get(`/authors/${author.id}`)
			})
			.then(function(res) {
				res.body.firstName.should.equal(changes.firstName);
				res.body.lastName.should.equal(changes.lastName);
				res.body.username.should.equal(changes.username);
			});
		});
	});

});
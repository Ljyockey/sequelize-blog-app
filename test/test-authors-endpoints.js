const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const should = chai.should();
const app = require('../app');
const {Comment, Author, Post} = require('../models');

chai.use(chaiHttp);


describe('Authors API resource', function() {

	beforeEach(function() {
		return dropTable()
		.then(function() { 
			return seedTestData();
		});
	});


});
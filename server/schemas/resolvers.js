const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async () => {}
    },
    Mutation: {
        login: async(parent, { email, password }) => {

        },
        addUser: async(parent, { username, email, password }) => {

        },
        saveBook: async(parent, { BookData }, context) => {

        },
        removeBook: async(parent, { bookId }, context) => {

        }
    }

}

module.exports = resolvers;
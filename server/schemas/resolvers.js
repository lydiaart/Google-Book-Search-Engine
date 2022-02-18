const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const foundUser = await User.findOne({
                    _id: context.user._id
                });

                if (!foundUser) {
                    return resolvers.status(400).json({ message: 'Cannot find a user with this id!' });
                }

                return foundUser;
            } else {
                throw new AuthenticationError('Login is required!');
            }

        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },

        addUser: async (parent, { username, email, password }) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        saveBook: async (parent, { BookData }, context) => {
            console.log(context.user);

            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $addToSet: { savedBooks: BookData } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            else {
                throw new AuthenticationError('Login is required!');
            }
        },

        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $pull: { savedBooks: { bookId: URLSearchParams.bookId } } },
                    { new: true }
                );

                return updatedUser;
            }
            else {
                throw new AuthenticationError('Login is required!');
            }
        }
    }

}

module.exports = resolvers;
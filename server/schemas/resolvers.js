const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, {id}) => {
            return User.findOne({_id: id})
        }        
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            console.log(user)

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user with this email found!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            if (user.context) {
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {
                        $addToSet: { savedBooks: args },
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                )
            }
            throw new AuthenticationError('You must be logged in')
        },
        removeBook: async (parent, { bookId }, context ) => {
            if (user.context) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId }}},
                    { new: true }
                );
            }
            throw new AuthenticationError('You must be logged in')
        }
    }
};

module.exports = resolvers;
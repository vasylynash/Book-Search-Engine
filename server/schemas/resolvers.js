const { Book, User } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, {id}) => {
            return User.findOne({_id: id})
        }        
    }
};

module.exports = resolvers;
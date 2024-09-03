const FollowModel = require("../models/Follow");

const resolvers = {
    Mutation: {
        addFollow: async (_, args, contextValue) => {
            const user = contextValue.authentication()
            const result = await FollowModel.addFollow(args, user)
            return result
        }
    },
};
module.exports = resolvers;

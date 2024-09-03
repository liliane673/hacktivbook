const UserModel = require("../models/User");
const redis = require("../config/redis");

const resolvers = {
    Query: {
        getUsers: async (_, __, contextValue) => {
            contextValue.authentication()
            const users = await UserModel.getAllUsers();
            return users;
        },
        getUsersById: async (_, __, contextValue) => {
            const user = contextValue.authentication()
            // console.log(user, '-> di server user resolver')
            // const { _id } = args
            const result = await UserModel.getUsersById(user);
            await redis.set("user:all", JSON.stringify(result));
            return result;
        },
        searchUserByNameOrUsername: async (_, args, contextValue) => {
            contextValue.authentication()
            const user = await UserModel.searchUserByNameOrUsername(args);
            return user;
        },

    },
    Mutation: {
        registerUser: async (_, args) => {
            const result = await UserModel.registerUser(args)
            await redis.del("user:all");
            return result
        },
        loginUser: async (_, args) => {
            const result = await UserModel.loginUser(args)
            await redis.del("user:all");
            return result
        },
    },
};
module.exports = resolvers;

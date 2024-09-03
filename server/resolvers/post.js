const redis = require("../config/redis");
const PostModel = require("../models/Post");

const resolvers = {
    Query: {
        getPosts: async (_, __, contextValue) => {
            contextValue.authentication()

            const postsCache = await redis.get("posts:all")
            if (postsCache) {
                // console.log("masuk cache")
                return JSON.parse(postsCache)
            }

            // console.log("masuk ke mongodb")
            const posts = await PostModel.getAllPosts();
            await redis.set("posts:all", JSON.stringify(posts));

            return posts;
        },
        getPostById: async (_, args, contextValue) => {
            contextValue.authentication()
            const { _id } = args
            const user = await PostModel.getPostById(_id);
            return user;
        },
    },
    Mutation: {
        addPost: async (_, args, contextValue) => {
            const user = contextValue.authentication()

            const { NewPost } = args
            const result = await PostModel.addNewPost(NewPost, user)

            await redis.del("posts:all");
            return result
        },
        addCommentPost: async (_, args, contextValue) => {
            const user = contextValue.authentication()
            const { NewComment } = args
            console.log(NewComment, 'Newcomment=>>')
            const result = await PostModel.addNewComment(NewComment, user)
            // const result = await PostModel.addNewComment(NewComment)
            await redis.del("posts:all");
            return result
        },
        addLikePost: async (_, args, contextValue) => {
            const user = contextValue.authentication()
            const { NewLike } = args
            const result = await PostModel.addNewLike(NewLike, user)
            return result
        },

    },
};
module.exports = resolvers;

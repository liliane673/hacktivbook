const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class PostModel {
    static collection() {
        return database.collection("posts")
    }

    static userCollection() {
        return database.collection("users")
    }

    static async getAllPosts() {
        const agg = [
            {
                '$sort': {
                    'createdAt': -1
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'authorId',
                    'foreignField': '_id',
                    'as': 'author'
                }
            }, {
                '$unwind': {
                    'path': '$author',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    'author.password': 0
                }
            }
        ];

        const posts = await this.collection().aggregate(agg).toArray()

        // const posts = await this.collection().find().toArray();
        return posts;
    }

    static async getPostById(_id) {
        const agg = [
            {
                '$match': {
                    '_id': new ObjectId(String(_id))
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'authorId',
                    'foreignField': '_id',
                    'as': 'author'
                }
            }, {
                '$unwind': {
                    'path': '$author',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    'author.password': 0
                }
            }
        ];

        const post = await this.collection().aggregate(agg).toArray()

        // const post = await this.collection().findOne({
        //     _id: new ObjectId((_id))
        // })
        if (!post) throw new Error("Post not found");
        return post[0]
    }

    static async addNewPost(payload, user) {
        const authorId = new ObjectId(String(user.id))
        let { content, tags, imgUrl } = payload

        if (!content) throw new Error("Post Content is required")

        if (!tags) {
            tags = []
        }
        const comments = []
        const likes = []
        const createdAt = new Date()
        const updatedAt = new Date()

        const newPost = await this.collection().insertOne({ content, tags, imgUrl, authorId, comments, likes, createdAt, updatedAt })
        return "Success Add New Post";
    }

    static async addNewComment(payload, user) {
        let { postId, content } = payload

        if (!postId) throw new Error("Choose Post first")
        if (!content) throw new Error("Comment Content is required")

        const userId = new ObjectId(String(user.id))
        const findUser = await this.userCollection().findOne({ _id: userId })

        // const username = "Lili";

        const createdAt = new Date()
        const updatedAt = new Date()

        // const findpost = await this.collection().findOne(
        //     { _id: new ObjectId(String(postId)) })
        // console.log(findpost, 'findpost====>')

        const newComment = await this.collection().updateOne(
            { _id: new ObjectId(String(postId)) },
            { $push: { comments: { content, username: findUser.username, createdAt, updatedAt } } },
        )
        // console.log(newComment, '===> new comment')
        return "Success Add New Comment";
    }

    static async addNewLike(payload, user) {
        let { postId } = payload

        if (!postId) throw new Error("Choose Post first")

        const userId = new ObjectId(String(user.id))
        const findUser = await this.userCollection().findOne({ _id: userId })
        console.log(payload, 'payload di server add like')

        const createdAt = new Date()
        const updatedAt = new Date()

        // const findpost = await this.collection().findOne(
        //     { _id: new ObjectId(String(postId)) })
        // console.log(findpost, 'findpost====>')

        const newLike = await this.collection().updateOne(
            { _id: new ObjectId(String(postId)) },
            { $push: { likes: { username: findUser.username, createdAt, updatedAt } } },
        )
        console.log(newLike, '===> newLike')
        return "Success Like Post";
    }






}

module.exports = PostModel;

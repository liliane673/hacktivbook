const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class FollowModel {
    static collection() {
        return database.collection("follows")
    }

    static userCollection() {
        return database.collection("users")
    }

    static async addFollow(payload, user) {
        let { followingId } = payload;
        // console.log(payload, "===>>> payload follow")

        if (!followingId) throw new Error("Choose User first")

        followingId = new ObjectId(String(followingId))

        const userId = new ObjectId(String(user.id))
        const findUser = await this.userCollection().findOne({ _id: userId })

        const createdAt = new Date()
        const updatedAt = new Date()

        const result = await this.collection().insertOne({ followingId, followerId: findUser._id, createdAt, updatedAt })
        // console.log(result, "=====>> add follow model mongodb")
        return "Success follow user"
    }
}

module.exports = FollowModel
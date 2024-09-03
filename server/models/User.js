const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class UserModel {
    static collection() {
        return database.collection("users")
    }

    static async getAllUsers() {
        const users = await this.collection().find().toArray();
        return users;
    }

    static async getUsersById(user) {
        // const findUser = await this.collection().findOne({ id: user.id })
        // console.log(user, user.id, '---->user DI SERVER')

        const agg = [
            {
                '$match': {
                    '_id': new ObjectId(String(user.id))
                }
            }, {
                '$lookup': {
                    'from': 'follows',
                    'localField': '_id',
                    'foreignField': 'followingId',
                    'as': 'follower'
                }
            }, {
                '$lookup': {
                    'from': 'follows',
                    'localField': '_id',
                    'foreignField': 'followerId',
                    'as': 'following'
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'follower.followerId',
                    'foreignField': '_id',
                    'as': 'followerInfo'
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'following.followingId',
                    'foreignField': '_id',
                    'as': 'followingInfo'
                }
            }, {
                '$project': {
                    'password': 0,
                    'followerInfo.password': 0,
                    'followingInfo.password': 0
                }
            }
        ];

        const resultUser = await this.collection().aggregate(agg).toArray()
        // console.log(resultUser, 'resultUser di server >>')
        if (!resultUser) throw new Error("User not found");
        return resultUser[0]
    }

    static async searchUserByNameOrUsername(payload) {
        // console.log("masuk di search user server")
        const { name } = payload;

        const agg = [
            {
                '$match': {
                    '$or': [
                        {
                            'username': {
                                '$regex': String(name),
                                '$options': 'i'
                            }
                        }, {
                            'name': {
                                '$regex': String(name),
                                '$options': 'i'
                            }
                        }
                    ]
                }
            }
        ];
        const userByNameUsername = await this.collection().aggregate(agg).toArray()

        // const userByNameUsername = await this.collection().find({ name: name }).toArray();
        if (!userByNameUsername) throw new Error("User not found");

        return userByNameUsername;
    }

    static async registerUser(payload) {
        // console.log(payload, "masuk di register user model")
        let { name, username, email, password } = payload;

        if (!name) throw new Error("Name is required");
        if (!username) throw new Error("Username is required");
        if (!email) throw new Error("Email is required");
        if (!password) throw new Error("Password is required");

        const validation = UserSchema.safeParse(body)
        if (!validation.success) throw validation.error

        const findUsername = await this.collection().findOne({ username: username });
        if (findUsername) throw new Error("Username must be unique");

        const findEmail = await this.collection().findOne({ email: email });
        if (findEmail) throw new Error("Email must be unique");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) throw new Error("Email format is invalid");

        if (password.length < 5) throw new Error("Password min. 5 characters");


        password = hashPassword(password);
        const result = await this.collection().insertOne({ name, username, email, password })

        return "Success registered user"
    }

    static async loginUser(payload) {
        let { username, password } = payload;
        if (!username) throw new Error("Username is required");
        if (!password) throw new Error("Password is required");

        const user = await this.collection().findOne({ username: username })
        console.log(user, '====>user login')
        if (!user) throw new Error("Invalid email or password");

        const isPasswordVaild = comparePassword(password, user.password);
        if (!isPasswordVaild) throw new Error("Invalid email or password");

        const token = {
            access_token: signToken({
                id: user._id,
                email: user.email
            })
        }

        return token
    }
}

module.exports = UserModel;

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefsUser = require('./schema/user');
const typeDefsFollow = require('./schema/follow');
const typeDefsPost = require('./schema/post');

const resolversUser = require('./resolvers/user');
const resolversFollow = require('./resolvers/follow');
const resolversPost = require('./resolvers/post');
const { verifyToken } = require("./helpers/jwt");


const server = new ApolloServer({
    typeDefs: [typeDefsUser, typeDefsFollow, typeDefsPost],
    resolvers: [resolversUser, resolversFollow, resolversPost],
    introspection: true,
});

async function startServer() {
    const { url } = await startStandaloneServer(server, {
        listen: { port: process.env.PORT || 3000 },
        // listen: { port: 3000 },
        context: async ({ req, res }) => {
            return {
                authentication: () => {
                    const access_token = req.headers.authorization
                    // console.log(access_token, 'authToken====>>>')

                    if (!access_token) throw new Error("Unauthenticated")

                    const [bearer, token] = access_token.split(" ");
                    if (bearer !== "Bearer") throw new Error("Unauthenticated")

                    const payloadToken = verifyToken(token)
                    // console.log({ payloadToken }, '====payload auth');

                    return payloadToken
                }
            }
        }
    });

    console.log(`🚀  Server ready at: ${url}`);
}

startServer();

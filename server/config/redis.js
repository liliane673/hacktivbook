const Redis = require("ioredis");
const redis = new Redis({
    host: "redis-10709.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    port: "10709",
    username: "default",
    password: process.env.PASSWORD_REDIS,
    db: 0
});

module.exports = redis;

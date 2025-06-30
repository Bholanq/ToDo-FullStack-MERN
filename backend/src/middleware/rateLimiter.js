
import ratelimit from "../config/upstash.js"

const rateLimiter = async (req,res,next) => {
try {

    const {success} = await ratelimit.limit("my-limit-key") // my-limit key is used here instead of ID,id would be used here for authentication
    if(!success){
        return res.status(429).json({message:"Too many requests, please try again later"
        });
    }
    next()
} catch (error) {
    console.log("rate limit errot",error);
    next();
}
}

export default rateLimiter
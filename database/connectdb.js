import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI_MONGO)
    console.log('connected to mongodb')
}
catch (error) {
    console.log('error conneccting to mongodb')
}
import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {     
        console.log("MongoDB Connection Failed");
        process.exit(1);
    }
};

export default connectMongoDB;
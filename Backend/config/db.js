import mongoose from "mongoose";
import colors from "colors";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected to MongoDB : ${conn.connection.host}.`.bgCyan);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

export default connectDb;

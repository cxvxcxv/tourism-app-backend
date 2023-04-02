import mongoose from "mongoose";

//connecting to mongoose "tourismDB" database

export const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://cxv:192@tourism.nb3sgel.mongodb.net/tourismDB?retryWrites=true&w=majority"
  );
};

// export const disconnectDB = async() => {
//     await mongoose.connection.close();
// }

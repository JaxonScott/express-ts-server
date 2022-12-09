import mongoose from "mongoose";

const dbConnect = () => {
  const conn = mongoose.connect(`${process.env.MONGO_URI}`, () => {
    console.log("connected to db!");
  });
};

export default dbConnect


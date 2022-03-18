import mongoose from "mongoose";

const connectDb = () => {
  if(mongoose.connections[0].readyState){
    console.log('[MONGOOSE]: CONNECTION ESTABLISH');
    return;
  }

  mongoose.connect(process.env.MONGODB_URI, {}, (err)=> {
    if(err) throw err;

    console.log('[MONGOOSE]: CONNECTION SUCCESSFULLY ESTABLISHED');

  })
}

export default connectDb;
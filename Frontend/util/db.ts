import { error } from 'console';
import mongoose, { ConnectOptions } from 'mongoose';


const MONGO_URL =  process.env.MONGO_URL || 'mongodb://localhost:27017/newSingup'

export async function connectedToDataBase() {
    try{
    await mongoose.connect(MONGO_URL)
        console.log("DataBase connected");
        
    }
    catch(error){
        console.log("Data base not connected ",error);
        
    }
}





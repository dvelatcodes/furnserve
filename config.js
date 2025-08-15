import dotenv from 'dotenv';
dotenv.config();

export const PORT = 5555;

export const mongDBURL = `mongodb+srv://dvelatcodes:${process.env.PASSWORD}@cluster1.w9m0s.mongodb.net/Ecom?retryWrites=true&w=majority&appName=Cluster1`
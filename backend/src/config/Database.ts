import mongoose from 'mongoose';
import 'dotenv/config';

export default class Database {
  public async connect() {
    try {
      await mongoose.connect(process.env.DATABASE_URL as string);
      console.log('Connected to database');
    } catch (error) {
      console.log('Error to connect with database');
    }
  }
}

mongoose.connection.on('error', () => {
  console.log('Error during connection with database');
});

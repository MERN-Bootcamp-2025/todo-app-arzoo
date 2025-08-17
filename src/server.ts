import dotenv from 'dotenv';
import { initializeDatabase } from './config/database';
import { App } from './app';

dotenv.config();
//this is the starting point of our application
async function server(): Promise<void>{
    try{//initialize the database connection
        console.log('Initializing the database connection...');
        await initializeDatabase();

        //Create and start the app
        const app = new App();
        const port = parseInt(process.env.PORT || '3000');

        //start server
        app.listen(port);

    }catch(error){
        console.error('Failed to start the application',error);
        process.exit(1)
    }
}

server();
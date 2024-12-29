import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

sqlite3.verbose();
const dbPath = path.resolve(__dirname, './database/user_database.sqlite');



function createDatabase(): void{
    if(!fs.existsSync(dbPath)){
        console.log("User's first time using the app. Creating database...");
        const db = new sqlite3.Database(dbPath, (err: Error | null) => {
            if(err){
                console.error('Error creating database', err.message);
            } else {
                db.serialize(() => {
                    db.run('CREATE TABLE IF NOT EXISTS goals');
                    db.run('CREATE TABLE IF NOT EXISTS data_activity');
                    db.run('CREATE TABLE IF NOT EXISTS screenshots');
                });
                console.log("Database created successfully");
                
            }
        });
    }
}
export {createDatabase};
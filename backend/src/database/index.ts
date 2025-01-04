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
                    //start here, create these databases
                db.serialize(() => {
                    db.run('CREATE TABLE IF NOT EXISTS goals (id INTEGER PRIMARY KEY AUTOINCREMENT, goal TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, deleted_at TIMESTAMP)');
                    db.run('CREATE TABLE IF NOT EXISTS data_activity (id INTEGER PRIMARY KEY AUTOINCREMENT, activity_type TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
                    db.run('CREATE TABLE IF NOT EXISTS screenshots (id INTEGER PRIMARY KEY AUTOINCREMENT, path TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, deleted_at TIMESTAMP)');
                });
                console.log("Database created successfully");
                
            }
        });
    }
}
export {createDatabase};

import * as sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import os from 'os';
import e from 'express';

console.log("index.ts has been loaded"); //execute as soon as something imports
sqlite3.verbose();
const dbDir = path.resolve(os.homedir(), '.myapp/database');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}
const dbPath = path.join(dbDir, 'user_db.sqlite');
console.log("Resolved path: ", dbPath); //should print resolved path

function createDatabase(): void{
    if(!fs.existsSync(dbPath)){
        console.log("User's first time using the app. Creating database...");
        const db = new sqlite3.Database(dbPath, (err: Error | null) => {
            if(err){
                console.error('Error creating database', err.message);
            } else {
                db.serialize(() => {
                    db.run('CREATE TABLE IF NOT EXISTS goals (id INTEGER PRIMARY KEY AUTOINCREMENT, goal TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, deleted_at TIMESTAMP)', (err: Error | null) => {
                        if(err){
                            console.error('Error creating goals table', err.message);
                        }
                    });
                    db.run('CREATE TABLE IF NOT EXISTS data_activity (id INTEGER PRIMARY KEY AUTOINCREMENT, activity_type TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)', (err: Error | null) => {
                        if(err){
                            console.error('Error creating data_activity table', err.message);
                        }
                    });
                    db.run('CREATE TABLE IF NOT EXISTS screenshots (id INTEGER PRIMARY KEY AUTOINCREMENT, path TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, deleted_at TIMESTAMP)', (err: Error | null) => {
                        if(err){
                            console.error('Error creating screenshot table', err.message);
                        }
                    });
                    db.run('INSERT INTO data_activity (activity_type) VALUES (?)', ['database_created'], function (err: Error | null) {
                        if(err){
                            console.error('Error logging data_activity', err.message);
                        } else {
                            console.log('Logged data activity successfully with id: ', this.lastID);
                        }
                    });
                });
                db.close((err: Error | null) => {
                    if(err){
                        console.error('Error closing database', err.message);
                    } else {
                        console.log('Database created successfully');
                    }
                });
            }
        });
    } else {
        console.log("Database already exists. No need to create one");
    }
}

function addGoal(goal: string, callback: (err: Error | null, newGoal?: { id: number; goal: string; created_at: string}) => void): void{
    const db = new sqlite3.Database(dbPath, (err: Error | null) => {
        if(err){
            console.error("Error opening database", err.message);
        } else {
            db.run('INSERT INTO goals (goal) VALUES (?)', [goal], function (err: Error | null) {
                if(err){
                    console.error('Error adding goal', err.message);
                    callback(err);
                } else {
                    console.log('Goal added successfully with id: ', this.lastID);
                    db.run('INSERT INTO data_activity (activity_type) VALUES (?)', ['goal_added'], function (err: Error | null) {
                        if(err){
                            console.error('Error logging data_activity', err.message);
                        } else {
                            console.log('Logged data activity successfully with id: ', this.lastID);
                        }
                    });
                    db.get('SELECT id, goal, created_at FROM goals WHERE id = ?', [this.lastID], (err: Error | null, row: { id: number; goal: string; created_at: string}) => {
                        if (err) {
                            console.error('Error fetching new goal', err.message);
                            callback(err);
                        } else {
                            callback(null, row);
                        }
                    })
                }
            });
        }
    });
}


export {createDatabase};
export {addGoal};
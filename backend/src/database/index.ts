
import * as sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import os from 'os';

//console.log("index.ts has been loaded"); //execute as soon as something imports
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
                            console.error('Error logging data_activity (database_created', err.message);
                        } else {
                            console.log('Logged data activity (database_created) successfully with id: ', this.lastID);
                        }
                    });
                });
                db.close((err: Error | null) => {
                    if(err){
                        console.error('Error closing database after creation', err.message);
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
                    console.error('Error adding new goal into goal table', err.message);
                    callback(err);
                } else {
                    console.log('Goal added successfully with id: ', this.lastID);
                    db.run('INSERT INTO data_activity (activity_type) VALUES (?)', ['goal_added'], function (err: Error | null) {
                        if(err){
                            console.error('Error logging data_activity (goal_added)', err.message);
                        } else {
                            console.log('Logged data activity (goal_added) successfully with id: ', this.lastID);
                        }
                    });
                    db.get('SELECT id, goal, created_at FROM goals WHERE id = ?', [this.lastID], (err: Error | null, row: { id: number; goal: string; created_at: string}) => {
                        if (err) {
                            console.error('Error fetching new goal when trying to return the newGoal via callback', err.message);
                            callback(err);
                        } else {
                            callback(null, row);
                        }
                        db.close()
                    })
                }
            });
        }
    });
}

function deleteGoal(id: number){
    const db = new sqlite3.Database(dbPath, (err: Error | null) => {
        if(err){
            console.error("Error opening database", err.message);
        } else {
            db.run('UPDATE goals SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id], function(err: Error | null){
                if(err){
                    console.error('Error deleting goal', err.message);
                } else {
                    console.log('Goal status set to deleted successfully');
                    db.run('INSERT INTO data_activity (activity_type) VALUES (?)', ['goal_marked_as_deleted'], function (err: Error | null) {
                        if(err){
                            console.error('Error logging data_activity (goal_marked_as_deleted)', err.message);
                        } else {
                            console.log('Logged data activity (goal_marked_as_deleted) successfully with id: ', this.lastID);
                        }
                        db.close()
                    });
                }
            });
        }
    })
}

function getGoals(): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, (err: Error | null) => {
            if(err){
                console.error("Error opening database for getGoals", err.message);
                reject(err)
                return
            }
            db.all(
                'SELECT id, goal, created_at, deleted_at FROM goals', (err, rows) => {
                if (err) {
                    console.log("Query failed in getGoal", err.message);
                    reject(err);
                } else {
                    resolve(rows)
                }
                db.close()
            })
        })
    })
}


export { addGoal, deleteGoal };


export {createDatabase, getGoals};

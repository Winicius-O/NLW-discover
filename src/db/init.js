const Database = require('./config');

const initDb = {
    async init(){
        const db = await Database();

        await db.exec(`CREATE TABLE rooms (
            ID INTEGER PRIMARY KEY,
            pass TEXT
            )`);

        await db.exec(`CREATE TABLE questions (
            roomID INTEGER,
            questionID INTEGER PRIMARY KEY AUTOINCREMENT,
            question_content TEXT,
            readed INTEGER
        )`);


        await db.close();
    }
}

initDb.init();
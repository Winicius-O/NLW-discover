const Database = require('../db/config');

module.exports = {
    async create(req, res){
        const db = await Database();
        const password = req.body.password;
        

        if(password.length == 0){
            res.redirect('/create-pass');
            return;
        }

        let uniqueRoom = false;
        let roomID;
        while(!uniqueRoom){
            roomID = genRoomID();
            const savedRooms = await db.all(`SELECT id FROM rooms`);
            uniqueRoom = savedRooms.length ? savedRooms.some(savedRoom => !(roomID === savedRoom)) : true;
        }

        await db.run(`INSERT INTO rooms (
            id,
            pass
        ) VALUES (
            ${parseInt(roomID)},
            "${password}"
        )`)

        await db.close();

        res.redirect(`/room/${roomID}`);
    },

    async openRoom(req, res){
        const db = await Database();
        const roomID = req.params.room;
        const questions = await db.all(`SELECT * FROM questions WHERE roomID = ${roomID} and readed = 0`);
        const questionsReaded = await db.all(`SELECT * FROM questions WHERE roomID = ${roomID} and readed = 1`);
        
        await db.close();
        res.render('room', {roomID: roomID, questions: questions, questionsReaded: questionsReaded});
    },

    enterCreatedRoom(req, res){
        const roomID = req.body.roomID;

        res.redirect(`/room/${roomID}`);
    }
}

function genRoomID(){
    let roomID = '';
        for(let i = 0 ; i<6 ; i++){
            roomID += Math.floor(Math.random() *10).toString();
        }
    return roomID;
}
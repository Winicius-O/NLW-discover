const Database = require('../db/config');

module.exports = {
    async index(req, res){
        const db = await Database();
        const roomID = req.params.room;
        const questionID = req.params.question;
        const action = req.params.action;
        const password = req.body.password;

        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomID}`);
        if(verifyRoom.pass == password){
            if(action == 'check'){
                await db.run(`UPDATE questions SET readed = 1 WHERE questionID = ${questionID} and roomID = ${roomID}`);
            }
            if(action == 'delete'){
                await db.run(`DELETE FROM questions WHERE questionID = ${questionID} and roomID = ${roomID}`);
            }
        }
        await db.close();
        res.redirect(`/room/${roomID}`);
        
    },

    async create(req, res){
        const db = await Database();
        const roomID = req.params.room;
        const question = req.body.question;

        await db.run(`INSERT INTO questions(
            roomID,
            question_content,
            readed
        )VALUES(
            ${roomID},
            "${question}",
            0
        )`);

        res.redirect(`/room/${roomID}`);
        await db.close();
    }
}
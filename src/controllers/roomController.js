const Database = require('../db/config');

module.exports = {
    async create(req, res){
        const db = await Database();
        const password = req.body.password;

        let roomID = '';
        for(let i = 0 ; i<6 ; i++){
            roomID += Math.floor(Math.random() *10).toString();
        }

        console.log(`guardando ${roomID} e ${password}`);

        await db.run(`INSERT INTO rooms (
            id,
            pass
        ) VALUES (
            ${parseInt(roomID)},
            ${password}
        )`)

        await db.close();

        res.redirect(`/room/${roomID}`);
    }
}
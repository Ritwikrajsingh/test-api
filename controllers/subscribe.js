const db = require("../database/models");

module.exports = {
    subscribe: async (req, res) => {
        const { email } = req.body
        console.log(email);
        try{
            const emailExists = await db.Subscribers.findAll(
                {where: {email}}
            )
            console.log( emailExists );
            if (emailExists.length){
                return res.status(409).send("You're already a subscriber!")
            }

            await db.Subscribers.create({email});

            return res.status(201).send("Subscribed Successfully!")

        }catch(err){
            res.status(400).send(`Bad Request ${err}`)
        }
    }
}
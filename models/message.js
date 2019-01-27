//let connection = require ('../config/db')
let moment = require ('../config/moment')
//let moment = require ('moment')
class Message {

    constructor (id, content, date) {
        this._id = id
        console.log("Nouveau message")
        this._content ="Mon message " + content
       // this.created_at = new Date()

    }

    get id () {
        return this._id 
    }
    set id (id) {
        this._id = id
    }

    get content () {
        return this._content 
        //return "Content"
    }
    set content (content) {
        this._content = content
    }

    get created_at () {
       // return this.created_at
       return moment(new Date())
    }
/*
    set created_at (maDate) {
        this.created_at = maDate
    }
*/
    static create (content, callBack) {
        //1. Connexion à la BDD
        //2. INSERT
        //connection.query ('INSERT INTO messages SET content = ?, created_at = ?', [content, new Date(), (err, result)])
        //if(err) throw err
        //callBack(result)
        console.log("Traitement du message")
        callBack()
    }
    static all (callBack) {
        console.log("Recuperation des messages enregistres")
        /*connection.query("SELECT * FROM messages", (err, rows) => {
            callBack(rows)
        })*/
        let messages = [new Message(1, 'Un premier contenu', new Date()), new Message(2, 'Un second contenu', new Date())]
        // On renvoi le tableau de rows / messages = utilisé direct par server.js ...
        callBack(messages)
    }


    static find (idMessage, callBack) {
        console.log("Recuperation des messages enregistres")
        /*connection.query("SELECT * FROM messages WHERE id = ? LIMIT 1", [id], (err, rows) => {
            callBack(rows)
        })*/
        // On renvoi le tableau de rows / messages = utilisé direct par server.js ...
        callBack(new Message(idMessage, 'Un premier contenu', new Date()))
    }
}

module.exports = Message
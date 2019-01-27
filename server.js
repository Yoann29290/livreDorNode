let express = require('express')
let app = express()
var bodyParser = require('body-parser');
var session = require('express-session');

// - Gestion des sessions
app.use(session({
    secret: 'maCleSecrete',
    resave: false,
    saveUninitialized: true,
    cookie: {secure:false}//Pas de HTTPS
}))

app.use (require('./middlewares/flash'))

// Moteur de template
app.set('view engine', 'ejs')

// Middleware
// - Distribution des ressources statiques
app.use('/assets', express.static('public'))
// - body parser (query.body)
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json()); // for parsing application/json

// Routes
app.get('/todo', (request, response) => {
    
    // - Utile avec la 2.
    /*if (request.session.erreur) {        
        response.locals.error = request.session.erreur // On stocke en locals        
        request.session.erreur = undefined  // On nettoie
    }*/
    //console.log(request.session)
    let env = process.env.NODE_ENV
    let Message = require ('./models/message')
    // - On recupere  les messages via la cb ...
    Message.all(function (messages) {
        response.render('pages/index', {messages: messages})
    })

   // response.render('pages/index', {test: 'salut'})
    
}).listen(8080)

app.get('/message/:idMessage', (request, response) => {
    //response.send(request.params.idMessage)
    let Message = require ('./models/message')
    Message.find(request.params.idMessage, function (message) {
        response.render('messages/show', {message: message})
    })
})

app.post('/', (request, response) => {
    // - Gestion du cas : validation a vide
    if(request.body.message === undefined || request.body.message === '') {
        //1. response.render('pages/index', {error: "Vous n'avez pas entré de message."})
        //2. request.session.erreur = "Vous n'avez pas entré de message"
        //3.
        request.flash('erreur', 'Entrée invalide')
        response.redirect('/')
    } else {
        // - Gestion du cas : Validation OK = enreg en BDD
        // Utilisation de MySQL
        let Message = require ('./models/message')
        Message.create(request.body.message, function () {
            request.flash('success', 'Merci pour le partage')  
            response.redirect('/')
        })
        
    }
    // - Redirection quelque soit le cas : NON POSSIBLE du fait du caractère asynchrone de JS ...
    //response.redirect('/')
})
// Tout middleware (celui-ci, le body parser) analyse ce qui rentre (request ) et modifie au besoin l'objet (response)
module.exports = function (request, response, next) {
    // next permet d'appeler une autre fonction apres celle-ci pour stoper un traitement par exemple
    if (request.session.flash) {        
        response.locals.flash = request.session.flash // On stocke en locals        
        request.session.flash = undefined  // On nettoie
    }


    request.flash = function (typeFlash, content){
        if(request.session.flash === undefined) {
            request.session.flash  = {}
        }
        request.session.flash[typeFlash] = content
    }
    next()
}
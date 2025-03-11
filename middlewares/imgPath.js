// Funzione per creare il path assoluto del'immagine
function setImagePath(req, res, next) {
    req.imagePath = `${req.protocol}://${req.get('host')}/movies_cover/`;
    next()
}

module.exports = setImagePath;
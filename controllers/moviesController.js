// Importiamo il file di connessione al database
const connection = require('../data/db');

function index(req, res) {

    // Query
    const sql = "SELECT * FROM movies;";

    // Conntetto la query
    connection.query(sql, (err, result) => {
        // In caso di errore
        if (err) return res.serverStatus(500).json({ error: 'Database query failed' });
        // Altrimenti..
        res.json(result)
    })
}

function show(req, res) {

    // Richiesta del parametro id
    const { id } = req.params;

    // Query per movies
    const paramsMovies = "SELECT * FROM movies WHERE movies.id = ?";

    //  Query per reviews
    const paramsReviews = "SELECT * FROM reviews WHERE movie_id = ?";

    // Conntetto la query
    connection.query(paramsMovies, [id], (err, moviesResult) => {
        // In caso di errore
        if (err) return res.serverStatus(500).json({ error: 'Database query failed' });
        // Se la risposta è un array vuoto
        if (moviesResult.length === 0) return res.serverStatus(404).json({ error: 'Not found' })
        // Altrimenti..
        // res.json(result[0])

        // salviamo il risultato in una variabile
        const movies = moviesResult[0];


        // Conntetto la query
        connection.query(paramsReviews, [id], (err, reviewResult) => {
            // In caso di errore
            if (err) return res.serverStatus(500).json({ error: 'Database query failed' });
            // Altrimenti..
            // aggiungiamo la proprietà reviews al risultato
            movies.reviews = reviewResult;

            // Risultato
            res.json(movies)
        })


    });
}

function store(req, res) {

}

function update(req, res) {

}

function modify(req, res) {

};

function destroy(req, res) {

}

// esportiamo tutto
module.exports = { index, show, store, update, modify, destroy }
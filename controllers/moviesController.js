// Importiamo il file di connessione al database
const connection = require('../data/db');

function index(req, res) {

    // Query
    const sql = "SELECT * FROM movies;";

    // Conntetto la query
    connection.query(sql, (err, result) => {
        // In caso di errore
        if (err) return res.status(500).json({ error: 'Database query failed' });

        // map del risultato
        const movies = result.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })

        // Altrimenti..
        res.json(movies)
    });
}

function show(req, res) {

    // Richiesta del parametro id
    const { id } = req.params;

    // Query per movies
    const paramsMovies = "SELECT * FROM movies WHERE movies.id = ?";

    //  Query per reviews
    const paramsReviews = "SELECT * FROM reviews WHERE movie_id = ?";

    // Conntetto la query
    connection.query(paramsMovies, [id], (err, movieResult) => {
        // In caso di errore
        if (err) return res.status(500).json({ error: 'Database query failed' });
        // Se la risposta è un array vuoto
        if (movieResult.length === 0) return res.serverStatus(404).json({ error: 'Not found' })
        // Altrimenti..
        // res.json(result[0])

        // salviamo il risultato in una variabile
        const movie = movieResult[0];


        // Conntetto la query
        connection.query(paramsReviews, [id], (err, reviewResult) => {
            // In caso di errore
            if (err) return res.status(500).json({ error: 'Database query failed' });
            // Altrimenti..
            // aggiungiamo la proprietà reviews al risultato
            movie.reviews = reviewResult;

            // aggiungiamo il valore path img da middleware
            movie.image = req.imagePath + movie.image;

            // Risultato
            res.json(movie)
        })


    });
}

function store(req, res) {

}

function storeReviews(req, res) {

    // Parametri Id
    const { id } = req.params;

    // Destructuring dei valori
    const { name, vote, text } = req.body

    // Query
    const dataReviewsSql = 'INSERT INTO reviews (name, vote, text, movie_id) VALUES (?, ?, ?, ?)'

    // Connetto la query
    connection.query(dataReviewsSql, [name, text, vote, id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(201);
        // Messaggio di conferma
        res.json({ message: 'Add reviews', id: result, insertId })
    })

}

function update(req, res) {

}

function modify(req, res) {

};

function destroy(req, res) {

}

// esportiamo tutto
module.exports = { index, show, store, storeReviews, update, modify, destroy }
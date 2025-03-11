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
// database module
var mysql = require('mssql');

// config database
var config = {
    user: 'sa',
    password: 'yourStrong(!)Password',
    server: 'localhost',
    database: 'waroeng',
    port: 1433,
    options: {
        encrypt: true, // Use this if you're on Windows Azure
        useUTC: true,
        trustServerCertificate: true
    }
};

// init database
var pool = new mysql.ConnectionPool(config, function (err) {
    if (err) {
        ShowErrors(err);
    }
});

//Fetch data
function RunQuery(sqlStr, callback) {
    var request = new mysql.Request(pool, function (err) {
        if (err) {
            ShowErrors(err);
        }
    });
    request.query(sqlStr, function (err, recordset) {
        if (err) {
            ShowErrors(err);
        }
        callback(recordset);
    });
}

//Throw errors
function ShowErrors(err) {
    console.log(err);
}

// expose this function to our app using module.exports
module.exports = {
    RunQuery: RunQuery
};

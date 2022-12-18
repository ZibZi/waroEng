## Requirements
* Node.js with the following modules
    * body-parser: ~1.13.2
    * cookie-parser: ~1.3.5
    * debug: ~2.2.0
    * express: ~4.13.1
    * jade: ~1.11.0
    * morgan: ~1.6.1
    * serve-favicon: ~2.3.0
    * mysql: ~2.9.0
    * passport: ~0.3.2
    * slugify: ~0.1.1

## install mssql via docker with docker-compose.yml 
```
version: "3"
services:
  sql-server:
    image: mcr.microsoft.com/mssql/server:2019-latest
    hostname: sql-server
    container_name: sql-server
    ports:
      - "1433:1433"
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=yourStrong(!)Password
      - MSSQL_PID=Express
```
## Installation
* Install dependencies in `package.json`: `npm install`

## make a connection in database.js
```
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
```
## initialisasi database
```
// init database
var pool = new mysql.ConnectionPool(config, function (err) {
    if (err) {
        ShowErrors(err);
    }
});
```
## fetching database 
```
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
```
## expose function to app using module.exports
```
module.exports = {
    RunQuery: RunQuery
};
```
## Usage
* Execute `node bin/www.js` from project directory



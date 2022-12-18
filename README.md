##Requirements
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
##Installation
* Install dependencies in `package.json`: `npm install`

##Usage
* Execute `node bin/www.js` from project directory



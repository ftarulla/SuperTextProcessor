var mysql = require('mysql')
, dbConfig = require('./dbconfig')
, messages = require('./services/messages');

module.exports.middleware = function(req, res, next) {

    var cnx = null;
    var svc = null;

    req.connection = function(){
        if(!cnx){
            cnx = mysql.createConnection(dbConfig);
        }
        return cnx;
    }

    req.services = function(){
        if(!svc){
            svc =  {
                messages: new messages(req.connection())
            };
        }
        return svc;
    }

    req.on("end", function(){
        if(cnx){
        //TODO: lo tuve que comentar, porque no me funcionaban los get. Verlo.
        //cnx.close();
        cnx = null;
        }
    });

    next();
}
var Promise = require('node-promise').Promise;

function Service(conn) {
    this.connection = conn;
};

Service.prototype.list = function() {
    var result = new Promise();
    this.connection.query('SELECT id, text FROM `text`', function(err, rows, fields) {
        if(err) {
            result.reject(err);
        }

        result.resolve(rows);
    }); 
    return result;   
}

Service.prototype.get = function(id) {
    var result = new Promise();
    this.connection.query('SELECT id, text FROM `text` WHERE id = ?', [id],
    function(err, rows, fields) {
        if (err) {
            result.reject(err);
            return;
        }

        if (rows.length == 0) {
            result.resolve(null);
        } else {
            var message = {
                id: rows[0].id,
                text: rows[0].text
            }
            result.resolve(message);
        }
    });
    return result;
}

Service.prototype.create = function(data) {
    var result = new Promise();
    this.connection.query('INSERT INTO `text` (text) VALUES (?)', [data.text],
    function(err, res) {
        if (err) {
            result.reject(err);
            return;
        }
        result.resolve(res.insertId);
    });
    return result;
}

Service.prototype.update = function(data) {
    var result = new Promise();
    this.connection.query('UPDATE `text` SET text = ? WHERE id = ?', [data.text, data.id],
    function(err, res) {
        if (err) {
            result.reject(err);
            return;
        }
        result.resolve(data.id);
    });
    return result;
}

Service.prototype.delete = function(id) {
    var result = new Promise();
    this.connection.query('DELETE FROM `text` WHERE id = ?', [id],
    function(err, res) {
        if (err) {
            result.reject(err);
            return;
        }
        result.resolve(id);
    });
    return result;
}

module.exports = Service;

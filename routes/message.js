
exports.fixedMessage = function(req, res){
    res.json({ message: 'Un mensaje interesante' });
}

exports.list = function(req, res){
    req.services().messages.list().then(
        function(messages) {
            if(messages) {
                res.json(messages);
            } else {
                res.json(500, { error: "Error message::list: NULL error" });
            }
        },
        function(err) {
            res.json(500, { error: "Error message::list: " + err });
        });
}

exports.get = function(req, res){

    var id = req.param('id');

    req.services().messages.get(id).then(
        function(message) {
            if(message) {
                res.json(message);
            } else {
                res.json(404, { error: 'El mensaje no existe.' });
            }
        }, 
        function(err){
            res.json(500, { error: "Error message::get: " + err });
        });

    // TODO: mover esto al servicio
    req.connection().query('SELECT id, text FROM `text`', function(err, rows, fields) {
        if (err) throw err;

        res.json(rows);
    });
}

exports.create = function(req, res) {

    var text = req.param('text');

    req.services().messages.create({ text: text })
    .then(function(id) {
        return req.services().messages.get(id);
    }).then(function(message) {
        res.json(message);
    }, function(err) {
        res.json(500, { error: "Error message::create: " + err });
    });
};

exports.update = function(req, res) {

    var id = req.param('id');
    var text = req.param('text');

    req.services().messages.update({ id: id, text: text })
    .then(function(id) {
        return req.services().messages.get(id);
    })
    .then(function(message) {
        res.json(message);    
    }, function(err) {
        res.json(500, { error: "Error message::update: " + err });
    });
};

exports.delete = function(req, res) {

    var id = req.param('id');

    req.services().messages.delete(id)
    .then(function(message) {
        if(message) {
            res.json(message);
        } else {
            res.json(404, { error: 'El mensaje no existe.' });
        }
    }, function(err) {
        throw err;
    });
};

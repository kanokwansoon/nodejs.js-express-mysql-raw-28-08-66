const Tutorial = require("../model/tutorial.model.js");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Centent can not be emty!"
        });
    }

    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    });

    Tutorial.create(tutorial, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred!"
            });
        }else{
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    const title = req.query.title;

    Tutorial.getAll(title, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred!"
            });
        }else{
            res.send(data);
        }
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Tutorial.findById(id, (err, data) => {
        if(err){
            if(err.kind == "not_found"){
                res.status(404).send({
                    message: "Not found Tutorial with id " + id
                });
            }else{
                res.status(500).send({
                message: "Error Tutorial with id " + id
                });
            }
        }else{
            res.send(data);
        }
    });
};

exports.findAllPublished = (req, res) => {
    Tutorial.getAllPublished((err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Some error occurred!"
            });
        
        }else{
            res.send(data)
        }
    });
};

exports.update = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: "Centent can not be emty!"
        });
    }

    Tutorial.updateById(req.params.id, new Tutorial(req.body), (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: "Not found id " + req.params.id 
                });
            }else{
                res.status(500).send({
                    message: "Error updating with id " + req.params.id
                });
            }
        }else{
            res.send(data); 
        }
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Tutorial.remove(id, (err, data) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    message: "Not found!"
                });
            }else{
                res.status(500).send({
                    message: "Could not delete id " + id
                });
            }
        }else{
            res.send({message: "Deleted successfully"});
        }
    });
};

exports.deleteAll = (req, res) => {
    Tutorial.removeAll((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred!"
            });
        }else{
            res.send({message: "All Tutorials were deleted successfully!"});
        }
    });
};
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

//models
const Camera = require('./Camera.js');

//connect server to mongoDB
var db = mongoose.connection;
db.on('error', console.error);
db.once('open',()=> console.log("Connected to mongod server!"));
mongoose.connect('mongodb://localhost:27017/cameraAdminTest', { useNewUrlParser: true, useCreateIndex: true, });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

//search cameras
app.get('/api/camera/search', (req, res) => {
    let type=req.query.type;
    let value=req.query.value;
    Camera.find({[''+type]:{'$regex':value,'$options':'i'}}).exec((err, cameras) => {
        if(err) return res.status(404).send('Error while getting cameras!');
        return res.send({cameras});
    });
});

//retrieves all the cameras
app.get('/api/camera/list', (req, res) => {
    Camera.find({}).exec((err, cameras) => {
        if(err) return res.status(404).send('Error while getting cameras!');
        return res.send({cameras});
    });
});

//create a new camera info
app.post('/api/camera/add', (req, res) => {
    const camera = new Camera({
        cName: req.body.cName,
        label: req.body.label,
        objType: req.body.objType,
        rtspURI: req.body.rtspURI,
    });
    camera.save((err) => {
        if(err) return res.status(404).send({message: err.message});
        return res.send({camera});
    });
});

//edit an existing camera with the given object id
app.post('/api/camera/edit/:id', (req, res) => {
    let options = {new: true};
    Camera.findByIdAndUpdate(req.params.id, req.body.data, options, (err, camera) => {
        if(err) return res.status(404).send({message: err.message});
        return res.send({ message: 'camera edited!', camera });
    });
});

//delete an existing camera with the given obejct id
app.post('/api/camera/delete/:id', (req, res) => {
    Camera.findByIdAndRemove(req.params.id, (err) => {
        if(err) return res.status(404).send({message: err.message});
        return res.send({message: 'camera deleted!'});
    });
});

const PORT = 5000;
app.listen(PORT);
console.log('api running on port' + PORT + ': ');
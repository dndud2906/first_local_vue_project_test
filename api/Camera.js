const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cameraSchema = Schema(
    {
        cName: {type: String, required: true},
        label: {type: String, required: true},
        objType: {type: String, required: true},
        rtspURI: {type: String, required: true},
        // description: String,
        // bitRate: Number,
        // codec: Number,
        // rtspID: String,
        // rtspPW: String,
        // latitude: Number,
        // longitude: Number,
        // width: Number,
        // height: Number,
        // fps: Number,
        // rcNum: Number,
        // period: Number 
    }
);

module.exports = mongoose.model('camera', cameraSchema);
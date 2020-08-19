const fbdl = require("../index");
const fs = require("fs");

fbdl.download("https://www.facebook.com/alanwalkermusic/videos/277641643524720")
    .then(res => {
        res.pipe(fs.createWriteStream("./aw.mp4"));
    })
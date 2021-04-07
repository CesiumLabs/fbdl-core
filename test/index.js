const fbdl = require("../index");

async function test(){
    var videoInfo = await fbdl.getInfo("https://www.facebook.com/alanwalkermusic/videos/277641643524720")
    console.dir(videoInfo, {depth: null})
}

test()


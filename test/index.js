const fbdl = require("../index");

async function test(){
    var videoInfo = await fbdl.getInfo("https://www.facebook.com/100003953227323/videos/1967968463344909/")
    console.dir(videoInfo, {depth: null})
}

test()


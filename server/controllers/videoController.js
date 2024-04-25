const fs = require('fs');

async function event( req, res ){
    // console.log('here inside video/event');
    const range = req.headers.range;
    console.log(range);
    if (!range) {
        return res.status(400).send("Requires Range header");
    }
    const videoPath = "./videos/eventBackGroundVideo.mp4";
    const videoSize = fs.statSync("./videos/eventBackGroundVideo.mp4").size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
}

async function keynote( req, res ){
    // console.log('here inside video/event');
    console.log('Keynote');
    const range = req.headers.range;
    console.log(range);
    if (!range) {
        return res.status(400).send("Requires Range header");
    }
    const videoPath = "./videos/keynoteBackGroundVideo.mp4";
    const videoSize = fs.statSync("./videos/keynoteBackGroundVideo.mp4").size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
}

module.exports = { event, keynote };
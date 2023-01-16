const multer = require("multer");
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const mongoose = require("mongoose");
const path = require('path');
const crypto = require('crypto');

const storage = new GridFsStorage({
    url: 'mongodb+srv://user:user@cluster0.3e5fa.mongodb.net/interviewhelperdb',
    options: { useUnifiedTopology: true, },
    file: (req, file) => {
        // this function runs every time a new file is created
        return new Promise((resolve, reject) => {
            // use the crypto package to generate some random hex bytes
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                // turn the random bytes into a string and add the file extention at the end of it (.png or .jpg)
                // this way our file names will not collide if someone uploads the same file twice
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'images',
                };
                // resolve these properties so they will be added to the new file document
                resolve(fileInfo);
            });
        });
    },
});

const store = multer({
    storage,
    // limit the size to 20mb for any files coming in
    limits: { fileSize: 20000000 },
    // filer out invalid filetypes
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

function checkFileType(file, cb) {
    // https://youtu.be/9Qzmri1WaaE?t=1515
    // define a regex that includes the file types we accept
    const filetypes = /jpeg|jpg|png|gif/;
    //check the file extention
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // more importantly, check the mimetype
    const mimetype = filetypes.test(file.mimetype);
    // if both are good then continue
    if (mimetype && extname) return cb(null, true);
    // otherwise, return error message
    cb('filetype');
}

const uploadMiddleware = (req, res, next) => {
    const upload = store.single('image');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.error(err)
           return res.status(400).send(err);
        } else if (err) {
            console.log('else if', err)
            // check if our filetype error occurred
            if (err === 'filetype') return res.status(400).send('Image files only');
            // An unknown error occurred when uploading.
            return res.sendStatus(500);
        }
        // all good, proceed
        next();
    });
};

module.exports = {uploadMiddleware};

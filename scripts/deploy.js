require('dotenv').config();
const AWS = require('aws-sdk');
const path = require("path");
const fs = require('fs');

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET,
  AWS_BUCKET_PATH,
} = process.env;

const EXTENSIONS_TYPES = {
    js: 'text/javascript',
    css: 'text/css',
    html: 'text/html',
    txt: 'text/plain',
    png: 'image/png',
    ico: 'image/vnd.microsoft.icon',
    map: 'text/javascript',
};

const walkSync = (currentDirPath, callback) => {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        const filePath = path.join(currentDirPath, name);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
};

const uploadDir = (s3Path, bucketName) => {
    let s3 = new AWS.S3({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1',
    });
    walkSync(s3Path, (filePath, stat) => {
        let bucketPath = filePath.substring(s3Path.length + 1);
        const parts = filePath.split('.');
        const extension = parts[parts.length - 1];
        let params = {
            Bucket: bucketName,
            Key: AWS_BUCKET_PATH !== '' ? `${AWS_BUCKET_PATH}/${bucketPath}` : bucketPath,
            Body: fs.readFileSync(filePath),
            ContentType: EXTENSIONS_TYPES[extension],

        };
        s3.putObject(params, function(err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log('Successfully uploaded '+ bucketPath +' to ' + bucketName);
            }
        });

    });
};

uploadDir('build', AWS_BUCKET);
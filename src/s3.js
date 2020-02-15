const s3Connection = function() {}
const AWS = require('aws-sdk');
const fs = require('fs')
const path = require("path");
module.exports = s3Connection;

s3Connection.uploadImage = (imageName) => {
    var imagePath = path.resolve(__dirname, "./public/" + imageName)
    var bucketName = 'itamarandleestoreproject';
    var objectParams = {Bucket: bucketName, ACL: 'public-read', Key: imageName, Body: fs.readFileSync(imagePath)};
    
    // Create object upload promise
    var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
    uploadPromise.then(
    function(data) {
        console.log("Successfully uploaded data to " + bucketName + "/" + imageName);
    }).finally(function() {
        fs.unlinkSync(imagePath)
    });
}

s3Connection.testCreds = () => {
    AWS.config.getCredentials(function(err) {
        if (err) console.log(err.stack);
        // credentials not loaded
        else {
          console.log("Access key:", AWS.config.credentials.accessKeyId);
          console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
        }
      });
}


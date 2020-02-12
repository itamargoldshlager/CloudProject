var multer = require('multer')
const Upload = function() {}


module.exports = Upload;

Upload.InitUploadFolder = () => {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, 'public')
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
      }
    })
    
    var upload = multer({ storage: storage }).single('file')

    Upload.upload = upload;
}

Upload.GetUploadConfiguration = () => {
    if (typeof Upload.upload === 'undefined') {
        Upload.InitUploadFolder();
    }

    return Upload.upload;
}
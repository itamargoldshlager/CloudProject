var multer = require('multer')

exports.getProductsByCategory = function(req, res) {
    const category = req.params.category
    require('../DbConnection').SelectBy((data) => res.send(data), category)
}

exports.getProductById = function(req, res) {
    const id = req.params.id
    require('../DbConnection').selectById((data) => res.send(data), id);
}

exports.getMulitpleProductsById = function (req, res) {
    const ids = req.params.ids;
    require('../DbConnection').selectByMultipleId(ids, (data) => res.send(data));
}

exports.getAllProducts = (req,res) => {
    require('../DbConnection').SelectAll((data) => res.send(data))
}

exports.addNewProductToDb = (req,res) => {
    console.log(req.body)
    require('../DbConnection').InsertNewProduct(req.body.productName, req.body.productDescription, req.body.productCategory, req.body.productAmount, req.body.productPrice, (data) => res.send(data))
}

exports.addNewProduct = (req,res) => {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, 'src/public')
      },
      filename: function (req, file, cb) {
        console.log(req.params.id)
        console.log(file)
        cb(null, req.params.id + file.originalname.substring(file.originalname.lastIndexOf('.')) )
      }
  })

  var upload = multer({ storage: storage }).single('file')

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
    })
}


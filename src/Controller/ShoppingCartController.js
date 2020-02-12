exports.selectAllShoppingCartId = function(req, res) {
    require('../DbConnection').selectAllShoppingCartId((data) => res.send(data))
}

exports.insertProductToShoppingCart = function(req, res) {
    console.log(req.body)
    require('../DbConnection').insertProductToShoppingCart(req.body.productId, (data) => res.send(data))
}

exports.removeProductFromShoppingCart = function(req, res) {
    console.log(req.params.id)
    require('../DbConnection').removeProductFromShoppingCart(req.params.id, (data) => res.send(data));
}
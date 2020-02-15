exports.getAllOrders = function(req,res) {
    require('../DbConnection').getAllOrders((data) => res.send(data))
}

exports.addOrder = function(req, res) {
    console.log(req.body)
    require('../DbConnection').addOrder(
        req.body.firstName, 
        req.body.lastName,
        req.body.address,
        req.body.city,
        req.body.postal,
        req.body.country,
        (data) => res.send(data));
}

exports.changeStatus = function(req, res) {
    console.log(req.body)
    require('../DbConnection').changeOrderStatus(req.body.orderId, req.body.orderStatus, (data) => res.send(data))
}

exports.getProductsIdByOrder = function(req, res) {
    const id = req.params.id
    require('../DbConnection').getProductsIdByOrder(id, (data) => res.send(data))
}
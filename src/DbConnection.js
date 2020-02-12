const mysql = require('mysql');

const DataBase = function() {}

module.exports = DataBase;

DataBase.InitDb = () => {
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Aa12345678",
        database: "store"
    });
      
    con.connect((err) => {
    if (err) throw err;
        console.log("Connected!");
    });

    DataBase.db = con;
}

DataBase.GetDB = () => {
    if (typeof DataBase.db === 'undefined') {
        DataBase.InitDb();
    }

    return DataBase.db;
}

DataBase.CreateDb = () => {
    DataBase.GetDB().query("CREATE DATABASE mydb", (err, result) => {
        if (err) throw err;
        console.log("Database created");
      });
}

DataBase.CreateTable = () => {
    const sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    DataBase.GetDB().query(sql, (err, result) => {
        if (err) throw err;
        console.log("Table created");
    });
}

DataBase.CreateProductTable = () => {
    var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), description VARCHAR(255), category VARCHAR(255), amount INT)";
    DataBase.GetDB().query(sql, (err, result) => {
        if (err) throw err;
        console.log("Table created");
    });
}


DataBase.AddIdColumn = () => {
    var sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
    DataBase.GetDB().query(sql, (err, result) => {
      if (err) throw err;
      console.log("Table altered");
    });
}

DataBase.Insert = () => {
    var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    DataBase.GetDB().query(sql, (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
    });
}

DataBase.InsertNewProduct = (productName, productDescription, productCategorty, productAmount, productPrice, callback) => {
    var sql = "INSERT INTO products (name, description, category, amount, price) VALUES ('" + 
        productName + "','" + productDescription + "','" + productCategorty +  "'," + productAmount + "," + productPrice + ")";
    DataBase.GetDB().query(sql, (err, result) => {
        if (err) throw err;
        console.log(result.insertId)
        callback("" +result.insertId+ "")
        console.log("1 record inserted");
    });
}

DataBase.InsertMulti = () => {
    var sql = "INSERT INTO customers (name, address) VALUES ?";
    var values = [
      ['John', 'Highway 71'],
      ['Peter', 'Lowstreet 4'],
      ['Amy', 'Apple st 652'],
      ['Hannah', 'Mountain 21'],
      ['Michael', 'Valley 345'],
      ['Sandy', 'Ocean blvd 2'],
      ['Betty', 'Green Grass 1'],
      ['Richard', 'Sky st 331'],
      ['Susan', 'One way 98'],
      ['Vicky', 'Yellow Garden 2'],
      ['Ben', 'Park Lane 38'],
      ['William', 'Central st 954'],
      ['Chuck', 'Main Road 989'],
      ['Viola', 'Sideway 1633']
    ];
    DataBase.GetDB().query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    }); 
}

DataBase.SelectAll = (callback) => {
    DataBase.GetDB().query("SELECT * FROM customers",function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        callback(result)
    })
}

DataBase.SelectBy = (callback, whereQuery) => {
    DataBase.GetDB().query("SELECT * FROM products WHERE category = '" + whereQuery + "'", function (err, result) {
        if (err) throw err;
        callback(result)
        console.log(result);
    });
}

DataBase.selectById = (callback, productId) => {
    DataBase.GetDB().query("SELECT * FROM products WHERE id = " + productId, function (err, result) {
        if (err) throw err;
        callback(result)
        console.log(result);
    });
}


DataBase.selectAllShoppingCartId = (callback) => {
    DataBase.GetDB().query("SELECT * FROM shoppingcart", function (err, result) {
        if (err) throw err;
        callback(result)
        console.log(result);
    });
}

DataBase.insertProductToShoppingCart = (productId, callback) => {
    var sql = "INSERT INTO shoppingcart (productId, amount) VALUES (" + productId + ", 1)";
    DataBase.GetDB().query(sql, function (err, result) {
        if (err) throw err;
        callback(result)
        console.log(result);
    });
}

DataBase.selectByMultipleId = (ids, callback) => {
    var sql = "select * from products where id IN ("+ ids + ")"
    DataBase.GetDB().query(sql, function (err, result) {
        if (err) throw err;
        callback(result)
        console.log(result);
    });
}

DataBase.removeProductFromShoppingCart = (id, callback) => {
    var sql = "DELETE from shoppingcart where productId = " + id
    DataBase.GetDB().query(sql, function (err, result) {
        if (err) throw err;
        callback(result)
        console.log(result);
    });
}
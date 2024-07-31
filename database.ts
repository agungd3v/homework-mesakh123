import DataStore from "nedb";

const database: any = {};

database.products = new DataStore({filename: "database/product.db", timestampData: true});
database.orders = new DataStore({filename: "database/order.db", timestampData: true});
database.users = new DataStore({filename: "database/user.db", timestampData: true});

database.products.loadDatabase();
database.orders.loadDatabase();
database.users.loadDatabase();

export default database;

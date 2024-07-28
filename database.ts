import DataStore from "nedb";

const database = new DataStore({filename: "database.db", timestampData: true});
database.loadDatabase();

export default database;
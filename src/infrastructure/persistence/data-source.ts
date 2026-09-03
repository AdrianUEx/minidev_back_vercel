import "reflect-metadata";
import pg from "pg"; // Needed if we want to deploy in Vercel given how TypeORM imports drivers. This can force TypeORM to use the pg driver it needs.

import { DataSource } from "typeorm";
import { TypeORMAuthor } from "../../infrastructure/entities/typeOrmAuthor";
import { TypeORMBook } from "../../infrastructure/entities/typeOrmBook";
import { TypeORMCustomer } from "../../infrastructure/entities/typeOrmCustomer";
import { TypeORMLoan } from "../../infrastructure/entities/typeOrmLoan";

// * DataSource is what allows to establish connection with DB. Several can be declared depending on the databases to work with
// * They are always executed by calling initalize() method and connection is hold until destroy() is called.
// * The JSON inside DataSource() are the DataSourceOptions and they vary depending on the specified database in the "type" property in it.
// * In order to use DataSource it must be first invoked in the main file (usually app.js/index.js). Then, you can recover that instance by invoking the .manager() or .getRepository() method

export const AppDataSource = new DataSource({
  type: "postgres", // * Mandatory ALWAYS
  // ! if you want to use Supabase, then you must use the url property instead of host, port, username, password and database properties. The url property is simply the connection string that you can get from the supabase dashboard, and it is made by these properties, that's why you don't need them.
  url: process.env.SUPABASE_TRANSACTION_POOLER_URL, // * This is the connection string that you can get from the supabase dashboard. It is made by the host, port, username, password and database properties, that's why you don't need them.
  /*   
  host: "localhost",
  port: 5432,
  username: "devuser",
  password: "password",
  database: "books", 
  */
  synchronize: true, // * this property must be false when using migrations to not synchronize schemas automatically
  logging: true,
  entities: [TypeORMAuthor, TypeORMBook, TypeORMCustomer, TypeORMLoan],
  subscribers: [],
  migrations: [], // * This line, along 'synchronize: false', it's the basic setup for migrations
  driver: pg, // * Mandatory if deploying in Vercel. Without this parameter, Vercel throws DriverPackageNotInstalledError asking for npm install pg. It seems it happens because TypeORM >=1.1 loads drivers via a dynamic require that esbuild cannot bundle, so pg must be passed explicitly.
  // optional
  /*  migrationsRun: false, // * specifies whether migrations should run automatically when the application is launched. The default value is false
    migrationsTableName: "migrations", // * name of the table that stores information about executed migrations. The default value is 'false'
    migrationsTransactionMode: "all",  */ // * Controls the transaction mode when running migrations. The default value is "all", but other options are "none" and "each".
});

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap

export async function initializeDatabase() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Data Source from TypeORM has been initialized!");
    } else {
      console.log("Data Source from TypeORM is already initialized!");
    }
  } catch (error) {
    console.error("Error during Data Source initialization", error);
  }
}

import { Sequelize } from 'sequelize-typescript';


export default () => {
    const sequelize = new Sequelize({
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        models: [
         
        ]
    });    

    return sequelize;
};
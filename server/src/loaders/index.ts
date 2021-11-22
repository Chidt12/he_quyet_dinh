import expressLoader from '../loaders/express';
import schemaLoader from '../loaders/schema';

export default async ({expressApp}) => {
    await schemaLoader();
    await expressLoader({app: expressApp});
};
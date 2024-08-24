const { CosmosClient } = require('@azure/cosmos');

const endpoint = process.env.DB_ENDPOINT;
const key = process.env.DB_KEY;
const client = new CosmosClient({ endpoint, key });

const databaseId = process.env.DB_ID;
const containerId = process.env.DB_CID;

const database = client.database(databaseId);
const container = database.container(containerId);

module.exports = { container };

const { ApolloServer } = require("apollo-server");
const{ ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
require('dotenv').config();
import logger from './logger';

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "pokemon", url:  process.env.GQL_POKEMON_URL },
      //{ name: "user", url: process.env.GQL_USER_URL }, 
    ],

    introspectionHeaders: {
      Authorization: 'Bearer testing',
    },
  }),
});

const server = new ApolloServer({
  tracing: true,
  gateway,
  subscriptions: false,
  playground: {
    settings: {
      'schema.polling.enable': false,
    },
  },
});

server.listen().then(({ url }: { url: string }) => {
  logger.info(`🚀 Server ready at ${url}`);
});
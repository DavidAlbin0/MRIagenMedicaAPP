import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({

  //Imagen medica
  uri: 'http://mrimagenc.ddns.net:4000/graphql', 
  //Sacmag (Cada tanto se debe de cambiar)
  //uri: 'http://10.121.1.8:4000/graphql',
  //Casa
  //uri: 'http://192.168.0.200:4000/graphql',
  //MRI Visitantes (Se debe de cambiar)
  //uri: 'http://192.168.11.2:4000/graphql'
  //uri: 'http://192.168.15.121:4000/graphql'
});

const authLink = setContext(async (_, { headers }) => {
  // Obtener el token almacenado
  const token = await AsyncStorage.getItem('token');

  // Devolver los encabezados con el token
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

export default client;

import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from 'expo-secure-store';

const httpLink = createHttpLink({
    // uri: 'https://6c59-36-68-217-97.ngrok-free.app/',
    uri: 'https://hacktivbook.liliane-ernestin.site/',
});

const authLink = setContext(async (_, { headers }) => {
    try {
        const token = await SecureStore.getItemAsync("accessToken");

        if (!token) {
            throw new Error("Token error")
        } else {

            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : "",
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client

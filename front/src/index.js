import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import {client} from './graphql/client';
import GlobalStyles from "./GlobalStyles";
import App from './App';
import Meta from './Meta';

// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <GlobalStyles/>
    <Meta/>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
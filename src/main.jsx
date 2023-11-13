import React from 'react';
import ReactDOM from 'react-dom'; // Correct import
import { Provider } from 'react-redux'; // Correct import
import App from './App.jsx';
import './index.css';
import store from './redux/Store.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Use Provider with a capital 'P' */}
      <App />
    </Provider>
  </React.StrictMode>
);


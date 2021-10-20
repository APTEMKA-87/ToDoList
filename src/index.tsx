import React from 'react';
import {store} from './state/store';
import {Provider} from 'react-redux';
import AppWithRedux from './AppWithRedux';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd';
import store from './store'
import Routes from './routes';
import localeES from 'antd/es/locale/es_ES';
import 'dayjs/locale/es'

// import './index.css';
import reportWebVitals from './reportWebVitals';
// import 'antd/dist/antd.css'
import 'antd/dist/antd.min.css'
import './styles.less'

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={localeES}>
      <Routes />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

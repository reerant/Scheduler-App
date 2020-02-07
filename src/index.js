import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SchedulerApp from './SchedulerApp';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<SchedulerApp />, document.getElementById('root'));
serviceWorker.unregister();

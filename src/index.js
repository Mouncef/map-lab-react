import React from 'react';
// import ReactDOM from 'react-dom';
import AppOld from './App';
import './index.css';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<AppOld />);


/*ReactDOM.render(
  <App />,
  document.getElementById('root')
);*/

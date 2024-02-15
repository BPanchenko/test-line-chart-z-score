import React from 'react'
import ReactDOM from 'react-dom/client'
import dataset from './api/get-data';
import { SimpleZScoreComponent } from './components/SimpleZScore';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SimpleZScoreComponent dataset={dataset} />
  </React.StrictMode>,
)

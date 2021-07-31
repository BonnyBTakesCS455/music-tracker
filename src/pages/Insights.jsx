import React from 'react';

import Recommendations from './Recommendations';
import Graph from '../components/Graph';

function Insights(props) {
  return (
    <React.Fragment>
      <header className='App-header'>
        <h1>The insights page</h1>
        <Graph />
        <Recommendations {...props}/>
      </header>
    </React.Fragment>
  );
}

export default Insights;

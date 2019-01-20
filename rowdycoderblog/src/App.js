import './App.css';

import React, {Component} from 'react';

const list = [
  {
    title: 'React',
    url: 'http://reactjs.org',
    author: 'Jordan Walker',
    numComments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'http://redux.js.org',
    author: 'Dan Abramov, Andrew Clark',
    numComments: 2,
    points: 5,
    objectID: 1,
  },
];

class App extends Component {
  render() {
    return(
    <div className='App'>
      {list.map(function(item){
        return <div>{item.title}</div>
      })}
    </div>
    );
  }
}

export default App;

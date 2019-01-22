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

const isSearched = searchTerm=> item=>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: list,      
      searchTerm:'',
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(event) { //event has the value of the input field in its target object
    this.setState({searchTerm: event.target.value});
  }
  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  render() { 
    const {searchTerm, list} = this.state;
    return (
      <div className="App">
      <form>
        <input type="text"   
        value={searchTerm}     
        onChange={this.onSearchChange}
        />
      </form>
        {list.filter(isSearched(searchTerm)).map(item => {
          const onHandleDismiss = () =>
            this.onDismiss(item.objectID);
          return (
            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a> &nbsp;
            </span>
              <span>{item.author}</span> &nbsp;
            <span>{item.numComments}</span> &nbsp;
            <span>{item.points}</span> &nbsp;
            <span>
                <button
                  onClick={()=>this.onDismiss(item.objectID)}
                  type="button"
                >
                  Dismiss
            </button>
              </span>
            </div>
          );
        }
        )}
      </div>
    );
  }
}

export default App;

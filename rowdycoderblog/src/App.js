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
      searchTerm: '',
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(event) { //event has the value of the input field in its target object
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="App">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
        >
        Search
        </Search>
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

const Button = ({ onClick, className = '', children }) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>


const Search = ({value, onChange, children}) =>
    <form>
      {children} <input
        typer="text"
        value={value}
        onChange={onChange}
      />
    </form>

const Table = ({ list, pattern, onDismiss }) =>
  <div>
    {list.filter(isSearched(pattern)).map(item => {
      const onHandleDismiss = () =>
        onDismiss(item.objectID);
      return (
        <div key={item.objectID}>
          <span>
            <a href={item.url}>{item.title}</a> &nbsp;
          </span>
          <span>{item.author}</span> &nbsp;
          <span>{item.numComments}</span> &nbsp;
          <span>{item.points}</span> &nbsp;
          <span>
            <Button onClick={() => onDismiss(item.objectID)}>
              Dismiss
            </Button>
          </span>
        </div>
        );
       }
      )
    }
  </div>

export default App;

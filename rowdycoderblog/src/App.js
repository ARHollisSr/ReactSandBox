import './App.css';
import React, {Component} from 'react';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'http://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

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
      result:null,
      searchTerm:DEFAULT_QUERY,
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({result});
  }

  componentDidMount() {
    const {searchTerm} = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(response=>response.json())
    .then(result=>this.setSearchTopStories(result))
    .catch(error=>error);
  }

  onSearchChange(event) { //event has the value of the input field in its target object
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      //spread example
      //result: Object.assign({}, this.state.result, { hits: updatedHits })
      //Object spread - not in ES6 - propsed new feature but avail to React
      result: {...this.state.result, hits:updatedHits}
    });
  }

  render() {
    const { searchTerm, result } = this.state;
    console.log(this.state);
    if(!result) {return null;}
    return (
      <div className="page">
      <div className="interactions">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
        >
        Search
        </Search>
        </div>
        { result ?
        <Table
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
        : null
        }
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
  <div className="table">
  {list.filter(isSearched(pattern)).map(item =>
    <div key={item.objectID} className="table-row">
    <span style={{width:'40%'}}>
      <a href={item.url}>{item.title}</a>
    </span>
    <span style={{width:'30%'}}>{item.author}</span>   
    <span style={{width:'10%'}}>{item.numComments}</span>
    <span style={{width:'10%'}}>{item.points}</span>
    <span style={{width:'10%'}}>
      <Button onClick={()=> onDismiss(item.objectID)} className="active">
        Dismiss
      </Button>
    </span>    
    </div>
    )}
  </div>
 

export default App;

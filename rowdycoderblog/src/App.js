import './App.css';
import React, {Component} from 'react';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';
const PATH_BASE = 'http://hn.algolia.com/api/v9';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

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

/*
  const isSearched = searchTerm=> item=>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results:null,
      searchKey:'',
      searchTerm:DEFAULT_QUERY,
      error: null,
    };
    console.log("RESULTS: " + this.state.results);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
    return [this.state.results[searchTerm]];
  }

  fetchSearchTopStories(searchTerm, page=0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(response=>response.json())
    .then(result=>this.setSearchTopStories(result))
    .catch(error=>this.setState({error}));
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState({ results: { ...results, [searchKey]: { hits: updatedHits, page } } });
  }

  componentDidMount() {
    const {searchTerm} = this.state;
    this.setState({searchKey:searchTerm});

    this.fetchSearchTopStories(searchTerm);
  }

  onSearchChange(event) { //event has the value of the input field in its target object
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const {searchKey, results} = this.state;
    const {hits, page} = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({
      //spread example
      //result: Object.assign({}, this.state.result, { hits: updatedHits })
      //Object spread - not in ES6 - propsed new feature but avail to React
      results: {...results, [searchKey]: {hits: updatedHits, page}}
    });
  }

  render() {
    const { searchTerm, results, searchKey, error } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list =( results && results[searchKey] && results[searchKey].hits) || [];

    console.log(this.state);
    //if(!results) {return null;}    
    return (
      <div className="page">
      <div className="interactions">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
        >
        Search
        </Search>
        </div>
        { results ?
        <Table
          list={list}
          onDismiss={this.onDismiss}
        />
        : null
        }
        {error ? 
          <div className="interactions">
            <p>Something went wrong.</p>
          </div>
          : <Table
            list={list}
            onDismiss={this.onDismiss}
          />
        }
        <div className="interactions">
          <Button onClick={()=>
          this.fetchSearchTopStories(searchKey, page + 1)}>
          More
          </Button>
        </div>
        
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


const Search = ({ value, onChange, onSubmit, children }) =>
  <form onSubmit={onSubmit}>
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
    <button type="submit">
      {children}
    </button>
  </form>

const Table = ({ list, pattern, onDismiss }) =>
  <div className="table">
  {list.map(item =>
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

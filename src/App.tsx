import logo from './logo.svg';
import './App.css';
import {
	Clothing, 
	TreeNode, 
	createInitialTree,
	get_by,
	filter_by_color,
	extract_clothe_array,
	filter_by_fit,
	filter_by_size,
	filter_by_style
} from './components/back';

const root_tree = createInitialTree();
const pantalones = get_by(root_tree, "class", "Superior");
if(pantalones !== undefined)
	console.log(filter_by_size(extract_clothe_array(pantalones), "S"));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

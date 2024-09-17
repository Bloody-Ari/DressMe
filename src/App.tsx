import logo from './logo.svg';
import './App.css';
import {
	Clothing, 
	TreeNode, 
	createInitialTree,
	getBy,
	filterByColor,
	extractClotheArray,
	filterByFit,
	filterBySize,
	filterByStyle
} from './components/back';

const root_tree = createInitialTree();
const pantalones = getBy(root_tree, "type", "Buzos");
console.log(pantalones);

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

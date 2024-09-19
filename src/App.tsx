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
	filterByStyle,
	rankClothes
} from './components/back';

const root_tree = createInitialTree();
const buzos = getBy(root_tree, "type", "Buzos");
const remeras = getBy(root_tree, "type", "Remeras");
let buzos_array: Array<Clothing> = [];
let remeras_array: Array<Clothing> = [];
if(buzos !== undefined && remeras !== undefined){
	buzos_array = extractClotheArray(buzos);
	remeras_array = extractClotheArray(remeras);
}
console.log(rankClothes([buzos_array[0]], remeras_array));

//there has to be a function like this to pick clothes
//it should create a clothe object that only contains
//the selected clothe color
//maybe use a global constant for selected clothes?
//useState? idk figure out what you prefer.
const selectClothe = () => {
	
}
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

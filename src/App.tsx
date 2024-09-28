import logo from './logo.svg';
import './App.css';
import {
	Clothing, 
	createInitialTree,
	getBy,
	extractClotheArray,
	rankClothes,
	createSuggestedOutfits
} from './components/back'

const root_tree = createInitialTree();

const buzos = getBy(root_tree, "type", "Buzos");
const remeras = getBy(root_tree, "type", "Remeras");
const bottom_clothes = getBy(root_tree, "class", "Inferior");

let buzos_array:   Array<Clothing> = [];
let remeras_array: Array<Clothing> = [];
let bottom_array:  Array<Clothing> = [];

if(buzos !== undefined && remeras !== undefined && bottom_clothes !== undefined){
	buzos_array = extractClotheArray(buzos);
	remeras_array = extractClotheArray(remeras);
	bottom_array = extractClotheArray(bottom_clothes);
}
const selected_clothes: Array<Clothing> = [];
//selected_clothes.push(buzos_array[1]);
//selected_clothes.push(remeras_array[1]);
buzos_array.forEach((c)=>{
	selected_clothes.push(c);
})
remeras_array.forEach((c)=>{
	selected_clothes.push(c);
})
console.log("Selected clothes: ", selected_clothes);
console.log(rankClothes(bottom_array, selected_clothes));
//console.log(createSuggestedOutfits(selected_clothes, bottom_array, 3, undefined));


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

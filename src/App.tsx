import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

class Clothing{
	model: string;
	material: string;
	fit: string;
	colors: Array<Array<string>>;
	style: string;
	sizes: string[];

    constructor(
		model: string,
		material: string,
		fit: string,
		colors: Array<Array<string>>,
		style: string,
		sizes: string[],
	){
		this.model = model;
		this.material = material;
		this.fit = fit;
		this.colors = colors;
	    this.style = style;
	    this.sizes = sizes;
	}
	printTree(){
		return;
	}
}

class TreeNode{
    data: string | Clothing;
    children: Array<TreeNode> = [];
    depth: number;
    parent: TreeNode | null = null;

    constructor(
        data: string | Clothing,
        depth: number,
    ){
        this.data = data;
        this.depth = depth;
    }

    addChild(child: TreeNode){
        if(child instanceof TreeNode)
            child.parent = this;
        this.children.push(child);
    }

    printTree(){
        let spaces: string = ''
        for(let i=0; i<=this.depth*2; i++)
            spaces += ' ';
        
        let prefix: string;
        if(this.parent == null)
            prefix = "";
        else
            prefix = spaces + "|__";
        
        if(typeof this.data == "string")
          console.log(prefix + this.data);
        else
          console.log(prefix + this.data.model);
        
        if(this.children.length > 0){
          this.children.forEach((child)=>{
						if(this instanceof TreeNode)
							child.printTree();
          })
        }
    }

    //yes, it's weird, but it's to make it less confusing
    /*
    get_by_class(_class: string){
        this.get_by("class", _class);
    }
    get_by_type(_type: string){
        this.get_by("type", _type);
    }
    */

    get_by_depth(depth: number){
        const queue:Array<TreeNode> = [this];
        const new_queue: Array<TreeNode> = [];

        while(queue.length > 0){
            const node = queue.pop();
						if(node === undefined)
							return;
            if(node.depth === depth)
              new_queue.push(node);
            else
							if(node.children instanceof TreeNode)
              node.children.forEach((child)=>{
                queue.push(child);
              })
        }

        return new_queue;
    }
}

function get_by(root_tree: TreeNode, identifier: string, value: string){
	const queue: Array<TreeNode> = [];
	const new_queue: Array<TreeNode> = [];
	queue.push(root_tree);

	while(queue.length > 0){
		let n = queue.length;
		while(n>0){
			const node = queue.pop();
			if(node === undefined)
				return;
			switch(identifier){
				case "class":
					if(node.data === value)
						new_queue.push(node);
				break;
				case "type":
					//if(node.data === va)
					//break;
			}
			n--;
		}
		return new_queue;
	}
}

const createInitialTree = () =>{
    const root = new TreeNode("Ropa", 0);

    const superior = new TreeNode("Superior", 1);

    const buzos_node = new TreeNode("Buzos", 2);

    const buzoA = new Clothing("BuzoA", "Algodon", "Regular Fit", [["Verde"], ["Gris"]], "Informal", ["S", "M", "L"]);
    const buzoB = new Clothing("BuzoB", "Algodon", "Regular Fit", [["Negro", "Blanco"], ["Gris"]], "Formal", ["S", "M", "L"]);
    const buzoC = new Clothing("BuzoC", "Algodon", "Regular Fit", [["Azul"], ["Verde"]], "Formal", ["S", "M", "L"]);
    const buzoD = new Clothing("BuzoD", "Algodon", "Regular Fit", [["Rojo", "Blanco"], ["Negro"]], "Informal", ["S", "M", "L"]);
    
    buzos_node.addChild(new TreeNode(buzoA, 3));
    buzos_node.addChild(new TreeNode(buzoB, 3));
    buzos_node.addChild(new TreeNode(buzoC, 3));
    buzos_node.addChild(new TreeNode(buzoD, 3));


    const remeras_node = new TreeNode("Remeras", 2);

    const remera_estampada = new Clothing("Remera Estampada", "Algodon", "Regular Fit", [["Blanco", "Rojo"]], "Casual", ["S", "M", "L"]);
    const remera_lisa = new Clothing("Remera Lisa", "Algodon", "Regular Fit", [["Blanco"], ["Negro"], ["Gris"]], "Casual", ["S", "M", "L"]);

    remeras_node.addChild(new TreeNode(remera_estampada, 3));
    remeras_node.addChild(new TreeNode(remera_lisa, 3));


    const camisas_node = new TreeNode("Camisas", 2);

    const camisa_lisa = new Clothing("Camisa Lisa", "Algodon", "Regular Fit", [["Blanco"], ["Azul"], ["Rosa"]], "Formal", ["S", "M", "L"]);
    const camisa_cuadrille = new Clothing("Camisa Cuadrille", "Algodon", "Slim Fit", [["Blanco", "Negro"], ["Negro", "Blanco"], ["Verde", "Azul"], ["Celeste", "Blanco"]], "Formal", ["S", "M", "L"]);

    camisas_node.addChild(new TreeNode(camisa_cuadrille, 3));
    camisas_node.addChild(new TreeNode(camisa_lisa, 3));


    superior.addChild(buzos_node);
    superior.addChild(remeras_node);
    superior.addChild(camisas_node);


    const inferior = new TreeNode("Inferior", 1);

    const pantalones_node = new TreeNode("Pantalones", 2);

    const jean_skinny = new Clothing("Jean Skinny", "Jean", "Skinny", [["Negro"], ["Azul"]], "Casual", ["42", "43", "44", "45"]);
    const jean_chupin = new Clothing("Jean Chupin", "Jean", "Chupin", [["Negro"], ["Arena"], ["Celeste"]], "Casual", ["42", "43"]);

    pantalones_node.addChild(new TreeNode(jean_chupin, 3));
    pantalones_node.addChild(new TreeNode(jean_skinny, 3));

    inferior.addChild(pantalones_node);


    const enteros = new TreeNode("Enteros", 1);


    root.addChild(superior);
    root.addChild(inferior);
    root.addChild(enteros);

    return root;
}



const root_tree = createInitialTree();
console.log(get_by(root_tree, "class", "Superior"));

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

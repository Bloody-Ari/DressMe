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

    get_by_depth(depth: number){
        const queue:Array<TreeNode> = [this];
        const new_queue: Array<TreeNode> = [];

        while(queue.length > 0){
            const node = queue.pop();
						if(node === undefined)
							return;
            if(node.depth === depth)
              new_queue.push(node);
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
					root_tree.get_by_depth(1)?.forEach((node)=>{
						if(node.data === value){
							node.children.forEach((child)=>{
								new_queue.push(child);
							})
						}
				})
				break;
				case "type":
					root_tree.get_by_depth(2)?.forEach((node)=>{
					if(node.data === value)
						node.children.forEach((child)=>{
							new_queue.push(child);
						})
				})
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


const filter_by_color = (filter_option: number, clothes: Array<Clothing>, color:string) => {
	const filtered_clothes:Array<Clothing> = [];

	clothes.forEach((clothe)=>{
		let clothe_colors;
		for(let i=0; i<=clothe.colors.length-1; i++){
			switch(filter_option){
				case 0:
					clothe_colors = clothe.colors[i][0];
					if(clothe_colors === color)
						filtered_clothes.push(clothe)
					if(clothe.colors[i].length > 1)
						clothe_colors = clothe_colors[i][1]
					if(clothe_colors === color && !filtered_clothes.includes(clothe))
						filtered_clothes.push(clothe);
					break;
				case 1:
					clothe_colors = clothe.colors[i][0];
					break;
				case 2:
					if(clothe.colors[i].length > 1)
						clothe_colors = clothe.colors[i][1];
			}
			if(filter_option > 0)
				if(clothe_colors === color)
					filtered_clothes.push(clothe);
		}
	})
	return filtered_clothes;
}


//goes to everything you give it, returns all clothes.
const extract_clothe_array = (nodes: Array<TreeNode>) =>{
	const clothe_array:Array<Clothing> = [];
	const queue = nodes;

	queue.forEach((node)=>{
		node.children.forEach((child)=>{
			queue.push(child);
		})
	})
	queue.forEach((node)=>{
		if(node.data instanceof Clothing)
			clothe_array.push(node.data);
	})

	return clothe_array;
}

const filter_by_fit = (clothes: Array<Clothing>, search_string: string) => {
	const filtered_clothes:Array<Clothing> = [];
	clothes.forEach((clothe)=>{
		if(clothe.fit === search_string)
			filtered_clothes.push(clothe);
	});
	return filtered_clothes;
}

const filter_by_size = (clothes: Array<Clothing>, search_size: string)=>{
	const filtered_clothes:Array<Clothing> = [];
	clothes.forEach((clothe)=>{
		clothe.sizes.forEach((size)=>{
			if(size === search_size && !filtered_clothes.includes(clothe))
				filtered_clothes.push(clothe);
		});
	});
	return filtered_clothes;
}

const filter_by_style = (clothes: Array<Clothing>, search_string: string)=>{
	const filtered_clothes:Array<Clothing> = [];
	clothes.forEach((clothe)=>{
		if(clothe.style === search_string)
			filtered_clothes.push(clothe);
	});
	return filtered_clothes;
}

//falta filtro por material btw

export {
	Clothing, 
	TreeNode, 
	createInitialTree,
	get_by,
	filter_by_color,
	extract_clothe_array,
	filter_by_fit,
	filter_by_size,
	filter_by_style
};

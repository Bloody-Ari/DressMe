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
	  this.style = style; //deberia sr tipo "Casual"| "Informal"| "Formal"| "Deportiva"
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

    getByDepth(depth: number){
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

class Color{
	name: string;
	temperature: "Frio" | "Calido" | "Neutro";
	complementaries: string;
	monochromatics: Array<string>;
	analog: Array<string>;

	constructor(
		name: string,
		temperature: "Frio" | "Calido" | "Neutro",
		complementaries: string,
		monochromatics: Array<string>,
		analog: Array<string>,
	){
		this.name = name;
		this.temperature = temperature;
		this.complementaries = complementaries;
		this.monochromatics = monochromatics;
		this.analog = analog;
	}
}

function getBy(root_tree: TreeNode, identifier: string, value: string){
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
					root_tree.getByDepth(1)?.forEach((node)=>{
						if(node.data === value){
							node.children.forEach((child)=>{
								new_queue.push(child);
							})
						}
				})
				break;
				case "type":
					root_tree.getByDepth(2)?.forEach((node)=>{
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

const color_list: Array<Color> = [];

const createInitialTree = () =>{
    const root = new TreeNode("Ropa", 0);

    const superior = new TreeNode("Superior", 1);

    const buzos_node = new TreeNode("Buzos", 2);

    const buzoA = new Clothing("BuzoA", "Algodon", "Regular Fit", [["Verde Obscuro"], ["Gris"]], "Informal", ["S", "M", "L"]);
    const buzoB = new Clothing("BuzoB", "Algodon", "Regular Fit", [["Negro", "Blanco"], ["Gris"]], "Formal", ["S", "M", "L"]);
    const buzoC = new Clothing("BuzoC", "Algodon", "Regular Fit", [["Azul"], ["Verde Obscuro"]], "Formal", ["S", "M", "L"]);
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
    const camisa_cuadrille = new Clothing("Camisa Cuadrille", "Algodon", "Slim Fit", [["Blanco", "Negro"], ["Negro", "Blanco"], ["Verde Obscuro", "Azul"], ["Celeste", "Blanco"]], "Formal", ["S", "M", "L"]);

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

		populate_colors();
    return root;
}

const populate_colors = () =>{
	color_list.push(new Color("Azul", "Frio", "Amarillo", ["Azul Obscuro","Azul Marino", "Celeste", "Blanco", "Negro"], ["Violeta"," Verde Obscuro"]));
	color_list.push(new Color("Amarillo", "Calido", "Azul", ["Crema","Blanco", "Negro"], ["Verde Obscuro","Naranja"]));
	color_list.push(new Color("Naranja", "Calido", "Celeste", ["Mostaza","Blanco", "Negro"], ["Amarillo","Rojo"]));
	color_list.push(new Color("Negro", "Neutro", "Blanco", ["Blanco","Gris"], ["Blanco","Gris"]));
	color_list.push(new Color("Blanco", "Neutro", "Negro", ["Negro","Gris"], ["Negro","Gris"]));
	color_list.push(new Color("Beige", "Frio", "Lila", ["Crema","Blanco, Negro"], ["Verde Obscuro","Marron"]));
	color_list.push(new Color("Salmon", "Calido", "Celeste", ["Coral","Blanco", "Negro"], ["Rojo","Naranja"]));
	color_list.push(new Color("Gris", "Neutro", "", ["Blanco"," Negro"], ["Blanco"," Negro"]));
	color_list.push(new Color("Verde Obscuro", "Frio", "Violeta", ["Verde Obscuro Claro","Blanco", "Negro"], ["Azul","Amarillo"]));
	color_list.push(new Color("Marron", "Calido", "Azul Obscuro", ["Chocolate","Blanco", "Negro"], ["Rojo","Naranja"]));
	color_list.push(new Color("Chocolate", "Calido", "Azul Marino", ["Marron","Blanco", "Negro"], ["Marron"," Purpura"]));
	color_list.push(new Color("Bordo", "Calido", "Azul Obscuro", ["Rojo","Blanco", "Negro"], ["Naranja","Violeta"]));
	color_list.push(new Color("Crema", "Neutro", "Beige", ["Beige","Blanco", "Negro"], ["Verde Obscuro Claro"," Coral"]));
	color_list.push(new Color("Mostaza", "Calido", "Azul Marino", ["Naranja","Blanco", "Negro"], ["Verde Obscuro Obscuro"," Bordo"]));
	color_list.push(new Color("Rojo", "Calido", "Celeste", ["Bordo","Rosa", "Blanco", "Negro"], ["Naranja"," Rosa"]));
	color_list.push(new Color("Turquesa", "Frio", "Coral", ["Blanco","Negro"], ["Celeste"," Verde Obscuro Claro"]));
	color_list.push(new Color("Celeste", "Frio", "Magenta", ["Azul Obscuro","Azul Marino", "Blanco", "Negro"], ["Azul"," Verde Obscuro Claro"]));
	color_list.push(new Color("Magenta", "Calido", "Celeste", ["Violeta","Fucsia", "Lila", "Purpura", "Blanco", "Negro"], ["Amarilo"," Celeste"]));
	color_list.push(new Color("Azul Marino", "Frio", "Mostaza", ["Azul Obscuro","Celeste", "Blanco", "Negro"], ["Azul Obscuro"," Purpura"]));
	color_list.push(new Color("Azul Obscuro", "Frio", "Marron", ["Celeste","Azul Marino", "Blanco", "Negro"], ["Azul Marino"," Purpura"]));
	color_list.push(new Color("Lila", "Calido", "Verde Obscuro Claro", ["Violeta","Fucsia", "Lila", "Magenta", "Blanco", "Negro"], ["Rosa"," Celeste"]));
	color_list.push(new Color("Purpura", "Calido", "Verde Obscuro Obscuro", ["Violeta","Fucsia", "Lila", "Magenta","Blanco", "Negro"], ["Violeta"," Bordo"]));
	color_list.push(new Color("Coral", "Calido", "Turquesa", ["Salmon","Blanco", "Negro"], ["Amarillo"," Rosa"]));
	color_list.push(new Color("Anaranjado", "Calido", "Celeste", [], ["Rojo"," Naranja"]));
	color_list.push(new Color("Violeta", "Frio", "Verde Obscuro Obscuro", ["Fucsia","Lila", "Magenta", "Purpura", "Blanco", "Negro"], ["Lila"," Rojo"]));
	color_list.push(new Color("Fucsia", "Calido", "Verde Obscuro Claro", ["Violeta","Lila", "Magenta", "Purpura", "Blanco", "Negro"], ["Rojo"," Azul"]));
	color_list.push(new Color("Verde Claro", "Calido", "Fucsia", ["Verde Obscuro Obscuro","Blanco", "Negro"], ["Turquesa"," Amarillo"]));
	color_list.push(new Color("Rosa", "Calido", "Turquesa", ["Bordo","Rojo", "Blanco", "Negro"], ["Violeta"," Rojo"]));
}


const filterByColor = (filter_option: number, clothes: Array<Clothing>, color:string) => {
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
const extractClotheArray = (nodes: Array<TreeNode>) =>{
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

const filterByFit = (clothes: Array<Clothing>, search_string: string) => {
	const filtered_clothes:Array<Clothing> = [];
	clothes.forEach((clothe)=>{
		if(clothe.fit === search_string)
			filtered_clothes.push(clothe);
	});
	return filtered_clothes;
}

const filterBySize = (clothes: Array<Clothing>, search_size: string)=>{
	const filtered_clothes:Array<Clothing> = [];
	clothes.forEach((clothe)=>{
		clothe.sizes.forEach((size)=>{
			if(size === search_size && !filtered_clothes.includes(clothe))
				filtered_clothes.push(clothe);
		});
	});
	return filtered_clothes;
}

const filterByStyle = (clothes: Array<Clothing>, search_string: string)=>{
	const filtered_clothes:Array<Clothing> = [];
	clothes.forEach((clothe)=>{
		if(clothe.style === search_string)
			filtered_clothes.push(clothe);
	});
	return filtered_clothes;
}


const filterByMaterial = (clothes: Array<Clothing>, search_string: string)=>{
	const filtered_clothes:Array<Clothing> = [];
	clothes.forEach((clothe)=>{
		if(clothe.material === search_string)
			filtered_clothes.push(clothe);
	});
}


//rank_clothes(selected_clothes, clothes_to_filter) -> array bidimensional [ Clothing ] [ Points ]
const rankClothes = (selected_clothes: Array<Clothing>, clothes_to_rank: Array<Clothing>) => {
	const ranked_clothes:Array<[Clothing, number]> = [];
	console.log("Selected clothes: " ,selected_clothes);
	console.log("Ranking: ", clothes_to_rank);
	
	selected_clothes.forEach((selected_clothe)=>{

		const selected_clothe_primary_colors:Array<Color> = [];
		const selected_clothe_secondary_colors:Array<Color> = [];
		//console.log(selected_clothe);
		color_list.forEach((color)=>{
			selected_clothe.colors.forEach((selected_clothe_color)=>{
				if(selected_clothe_color[0] === color.name){
					selected_clothe_primary_colors.push(color);
				}
				if(selected_clothe_color[1] === color.name){
					selected_clothe_secondary_colors.push(color);
				}
			})
		});
		//console.log(selected_clothe_primary_colors);
		//console.log(selected_clothe_secondary_colors);

		//console.log("CLOTHES TO RANK SECTION");

		clothes_to_rank.forEach((clothe_to_rank)=>{
			//console.log(clothe_to_rank);
			let points = 0;
			clothe_to_rank.colors.forEach((color)=>{
				selected_clothe_primary_colors.forEach((selected_clothe_color)=>{
					points += rankColor(selected_clothe_color, color[0], 2); //primary color
				});
				if(color[1] !== undefined)
					selected_clothe_primary_colors.forEach((selected_clothe_color)=>{
						points += rankColor(selected_clothe_color, color[1], 1); //primary color
					});
			})

			let exists = false;
			ranked_clothes.forEach((pair)=>{
				if(pair[0] === clothe_to_rank)
					exists = true;
			});
			if(exists){
				ranked_clothes[ranked_clothes.findIndex((pair)=>{return pair[0] === clothe_to_rank})][1] += points;
			} else {
				ranked_clothes.push([clothe_to_rank, points]);
			}
			points = 0;
			//if(ranked_clothes.includes([clothe_to_rank, points]))
				//console.log("MATCH");
		})
	});

	return ranked_clothes;
	//for each clothe, check with selected for matching parameters
}

const rankColor = (selected_color: Color, color_to_rank: string, modifier: number): number =>{
	let points = 0;

	if(selected_color.name === color_to_rank)
		points += 5 * modifier;
	if(selected_color.complementaries === color_to_rank)
		points += 10 * modifier;
	
	selected_color.analog.forEach((color)=>{
		if(color === color_to_rank)
			points += 2.5 * modifier;
	});

	selected_color.monochromatics.forEach((color)=>{
		if(color === color_to_rank)
			points += 5 * modifier;
	});

	return points;
}

export {
	Clothing, 
	TreeNode, 
	createInitialTree,
	getBy,
	filterByColor,
	extractClotheArray,
	filterByFit,
	filterBySize,
	filterByStyle,
	filterByMaterial,
	rankClothes,
};

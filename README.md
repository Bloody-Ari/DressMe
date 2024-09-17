# DressMe
## Backend Documentation
Se utiliza un árbol genérico para crear una esctructura ordenada para la ropa con cuatro niveles distintivos.
 - Nivel 0: Root
 - Nivel 1: Clase de ropa (Superior, Inferior, Enteros).
 - Nivel 2: Tipo de ropa (Remeras, Camisas, Pantalones).
 - Nivel 3: Nodos con la ropa como información.

A excpecion de los nodos del nivel 3 el campo "data" se utiliza para almancenar un título o nombre, en el nivel 3 este campo corresponde a un objeto de ropa.

![Imagen Estructura de Árbol](https://github.com/Bloody-Ari/DressMe/blob/back_dev/docs/images/Untitled-2024-09-17-1129.png?raw=true)

El árbol es creado con la función `createInitialTree()` la cual devuelve un objeto `TreeNode` con el título e hijos correspondientes. 

La creación y asignación de los hijos realizada en esa función sigue un patrón claro, por lo que es fácil modificarla para agregar o quitar ropa.
Una vez teniendo el árbol se pueden utilizar varias funciones incluídas para filtrar por tipo, clase, color, estilo, etc. Además, el objetivo principal de la página, el cuál será un algoritmo de puntuación de ropa.

------------
### Classes
#### TreeNode
    class TreeNode{
    	data: string | Clothing;
    	children: Array<TreeNode> = [];
    	depth: number;
    	parent: TreeNode | null = null;
    }
	constructor(data: string | Clothing, depth: number)
	addChild(child: TreeNode)
	printTree()
	geByDepth(depth: number) -> Array<TreeNode>
#### Clothing
    class Clothing{
    	model: string;
    	material: string;
    	fit: string;
    	colors: Array<Array<string>>;
    	style: string;
    	sizes: string[];
    }
	constructor(
		model: string, 
		material: string,
		fit: string,
		colors: Array<Array<string>>,
		style: string,
		sizes: string[],
		)
### Functions
#### createInitialTree
    createInitialTree() -> TreeNode

Esta función es la que crea el árbol de información principal. La manera en la que funciona es que primero crea un nodo inicial, como sería "Superior" y luego sus hijos, como podría ser "Remeras", luego crea los objetos correspondientes a las prendas y finalmente crea y asigna los hijos. 
Fragmento de código de ejemplo:
    const root  = new TreeNode("Ropa", 0);
    const superior = new TreeNode("Superior", 1);
    
    const buzos_node = new TreeNode("Buzos", 2);
    
    const buzoA = new Clothing("BuzoA", "Algodon", "Regular Fit", [["Verde"], ["Gris"]], "Informal", ["S", "M", "L"]);
    
    buzos_node.addChild(new TreeNode(buzo A, 3));
    superior.addChild(buzos_node);
    root.addChild(superior);

#### get_by
    function getBy(root_tree: TreeNode, identifier: string, value: string) -> Array<TreeNode>
Esta función permite obtener un array con los nodos de nivel 2 o 3 que deseemos de manera específica, por ejemplo podemos tomar la ropa que se encuentre en Superior o la que se encuentre en Buzos.

    const ropa_superior = getBy(root_tree, "class", "Superior");
    const buzos = getBy(root_tree, "type", "Buzos");

En el primer caso, `ropa superior`, tendríamos un array con los hijos del nodo "Superior", en el ámbito de prueba son buzos, remeras y camisas, pero esto puede cambiar. En el segundo caso `buzos` tendría los hijos del nodo "Buzos", los cuales en data contendrían la información de la indumentaria.

#### filterByColor
    function filterByColor(filter_option: number, clothes: Array<Clothing>, color: string) -> Array<Clothing>
Esta función toma un array de `Clothes` y devuelve un array con la ropa en ese array que contenga el color especificado en el lugar que indique la opcion de filtrado
Las opciones de filtrado son:
0: Cualquiera
1: Primario
2: Secundario
Esto significa que si queremos, por ejemplo, tomar la ropa superior con color primario rojo podriamos hacer lo siguiente:
    const red_clothes = filterByColor(1, ropa_superior, "Rojo")
Luego podriamos hacer cosas como utilizar la funcion sobre el nuevo array pero con un color secundario especifico.
#### filterByFit
    function filterByFit(clothes: Array<Clothing>, search_string: string) -> Array<Clothing>
#### filterBySize
     function filterBySize(clothes: Array<Clothing>, search_string: string) -> Array<Clothing>
Esta fución es aplicable a todas las prendas, pero siempre el término de búsqueda será un string, por ejemplo si queremos buscar por un pantalón talle 32 y una remera talle M utilizaríamos las siguientes llamadas:
    const pantalones_filtrados = filterBySize(pantalones, "32");
    const remeras_filtradas = filterBySize(remeras, "M");
#### filterByStyle
     function filterByStyle(clothes: Array<Clothing>, search_string: string) -> Array<Clothing>
#### filterByMaterial
     function filterByMaterial(clothes: Array<Clothing>, search_string: string) -> Array<Clothing>
#### extractClotheArray
    function extractClotheArray(nodes: Array<TreeNode>) -> Array<Clothing>
Esta función toma un `TreeNode` como argumento y devuelve los objetos `Clothing` que sean hijos o hijos de sus hijos de manera indiscriminada, puede utilizarse en clases y tipos sin distinción de uso y siempre devolverá un array con la ropa.
**Table of Contents**

[TOCM]

[TOC]

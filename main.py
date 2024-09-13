#in TS 
DEBUG = True
class Node:
    def __init__(self, data, depth):
        self.data = data
        self.children = []
        self.depth = depth
        self.parent = None

    def add_child(self, child):
        child.parent = self
        self.children.append(child)

    def print_tree(self):
        spaces = ' ' * self.depth * 2
        prefix = spaces + "|__" if self.parent else ""

        if type(self.data) is str:
            print(prefix + self.data)
        else:
            print(prefix + self.data.data)

        if self.children:
            for child in self.children:
                child.print_tree()
    
    def level_trasversal(self):
        queue = []
        queue.append(self)
        while(len(queue) != 0):
            n = len(queue)
            while(n > 0):
                node = queue[0]
                queue.pop(0)

                if type(node.data) is str:
                    print(node.data)
                else:
                    print(node.data.data)

                for child in node.children:
                    queue.append(child)

                n -= n
                #queue.pop(0)
                #print(item.data, end=' ')

    #returns an array with all nodes in especific level
    #for example, root.get_by_depth(3) gives all clothe nodes
    def get_by_depth(self, depth):
        queue = []
        new_queue = []
        queue.append(self)
        while(len(queue) != 0):
            n = len(queue)
            while(n > 0):
                node = queue.pop(0)
                if node.depth == depth:
                    new_queue.append(node)
                for child in node.children:
                    queue.append(child)
                n -= 1

        return new_queue

    def get_by(self, identifier, value):
        queue = []
        new_queue = []
        queue.append(self)
        while(len(queue) != 0):
            n = len(queue)
            while(n > 0):
                node = queue.pop(0)

                match identifier:
                    case "class":
                        for node in self.get_by_depth(1):
                            if type(node.data) != str:
                                return
                            if node.data == value:
                                for child in node.children:
                                    new_queue.append(child)
                    case "type":
                        for node in self.get_by_depth(2):
                            if node.data == value:
                                for child in node.children:
                                    new_queue.append(child)
                n -= 1

        return new_queue

#add amterial or description maybe??
class Clothing:
    def __init__(self, model, fit, colors, style):
        self.fit = fit
        #los colores es un array de array, sendo cada array una opcion de colores
        #la posicion del color en este determina la prioridad, el 0 es el color
        #primario y el 1 el secundario <3
        self.colors = colors
        self.style = style
        self.data = model


#ok, this is when things get weird probably
#filter_by_color(<0-1-2>, <clothes_array>, <color>)
#the color should be a string in spanish, like "Rojo" or "Verde"
#0 means that any color is fine
#1 means that you will only get the ones with that color as primary
#2 same as 1 but for secondary color
def filter_by_color(filter_option, clothes, color):
    filtered_clothes = []

    if DEBUG:
        print("Filtrando por color ", filter_option, " ", color)
        print("-=-"*12)

    for clothe in clothes:
        j=i=0
        clothe_colors = None

        if DEBUG:
            print(clothe.data)
            print(clothe.colors)

        while i < len(clothe.colors):
            match filter_option:
                case 0:
                    clothe_colors = clothe.colors[i][0]
                case 1:
                    clothe_colors = clothe.colors[i][0]
                case 2:
                    if len(clothe.colors[i]) > 1:
                        clothe_colors = clothe.colors[i][1]

            if clothe_colors == color:
                filtered_clothes.append(clothe)
            i += 1

        if DEBUG:
            print("-=-"*12)

    return filtered_clothes

def create_initial_tree():
    root = Node("Ropa", 0)

    superior = Node("Superior", 1)

    #colors scheme:
    #    option1          ,   option2
    #[[primary, secondary], [primary]]
    buzos = Node("Buzos", 2)
    buzoA = Clothing("BuzoA", "Oversized", [["Rojo"], ["Verde"]], "Clasico")
    buzos.add_child(Node(buzoA, 3))
    buzoB = Clothing("BuzoB", "Regular Fit", [["Negro"], ["Gris"], ["Rojo"]], "Clasico")
    buzos.add_child(Node(buzoB, 3))
    buzoC = Clothing("BuzoC", "Regular Fit", [["Negro", "Verde"], ["Marron", "Blanco"]], "Clasico")
    buzos.add_child(Node(buzoC, 3))
    buzoD = Clothing("BuzoD", "Regular Fit", [["Blanco", "Negro"], ["Rojo", "Negro"]], "Clasico")
    buzos.add_child(Node(buzoD, 3))
    buzoE = Clothing("BuzoE", "Regular Fit", [["Blanco", "Rojo"], ["Verde", "Rojo"]], "Clasico")
    buzos.add_child(Node(buzoE, 3))

    remeras = Node("Remeras", 2)
    remeraA = Clothing("Remera101", "Regular Fit", [["Blanca", "Negro"], ["Negro", "Gris"]], "Casual")
    remeras.add_child(Node(remeraA, 3))

    camisas = Node("Camisas", 2)
    camisaA = Clothing("Camisa101", "Regular Fit", [["Blanca"], ["Azul Francia"]], "Formal")
    camisas.add_child(Node(camisaA, 3))

    superior.add_child(buzos)
    superior.add_child(remeras)
    superior.add_child(camisas)


    inferior = Node("Inferior", 1)

    pantalones = Node("Pantalones", 2)
    pantalonA = Clothing("JeanA", "Chupin", ["Azul"], "Informal")
    pantalones.add_child(Node(pantalonA, 3))

    bermudas = Node("Bermudas", 2)
    bermudaA = Clothing("Bermuda de Jean", "Holgado", ["Celeste"], "Informal")
    bermudas.add_child(Node(bermudaA,3))

    shorts = Node("Shorts", 2)
    shortA = Clothing("ShortX", "Skinny", [["Blanco"], ["Celeste"]], "Informal")
    shorts.add_child(Node(shortA, 3))

    polleras =  Node("Polleras", 2)
    polleraA = Clothing("Pollera Tableada", "Regular", [["Negro", "Bordo"], ["Blanco"]], "Formal") 
    polleras.add_child(Node(polleraA, 3))

    inferior.add_child(pantalones)
    inferior.add_child(bermudas)
    inferior.add_child(shorts)
    inferior.add_child(polleras)


    enteros = Node("Enteros", 1)
    
    vestidos = Node("Vestidos", 2)
    vestidoA = Clothing("Vestido Chino", "Regular", [["Rojo", "Dorado"]], "Formal")
    vestidos.add_child(Node(vestidoA, 3))

    enteros.add_child(vestidos)


    #entero = Node("Entero", 1)
    #vestidos = Node("Vestidos", 2)


    root.add_child(superior)
    root.add_child(inferior)
    root.add_child(enteros)
    #root.add_child(inferior)
    #root.add_child(entero)
    return root

#test a 

if __name__ == "__main__":
    root = create_initial_tree()
    buzos = root.get_by("type", "Buzos")
    array_buzos = []
    for buzo in buzos:
        array_buzos.append(buzo.data)

    buzos_filtrados = filter_by_color(1, array_buzos, "Verde")
    print("Ropa filtrada:")
    for buzo in buzos_filtrados:
        print(buzo.data)

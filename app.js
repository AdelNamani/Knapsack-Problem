let app = new Vue({
    el: "#root",
    data: {
        poids_maximum: 10,
        last_id: 3,
        nom: "",
        poids: 0,
        valeur: 0,
        objects: [{
            id: 1,
            nom: 'Stylo',
            valeur: 5,
            poids: 2
        },
        {
            id: 2,
            nom: 'Cahier',
            valeur: 3,
            poids: 5
        }
        ],
        valeur_maximum: 0
    },
    methods: {
        addObject() {
            newObject = {};
            newObject.id = this.last_id + 1;
            newObject.nom = this.nom;
            newObject.poids = this.poids;
            newObject.valeur = this.valeur;
            this.objects.push(newObject);
            this.nom = "";
            this.poids = 0;
            this.valeur = 0;
            this.last_id++;

        },

        deleteObject(id) {
            this.objects = this.objects.filter((value) => {
                return value.id != id;
            });
        },

        knapsack() {
            $('#result').show();
            this.valeur_maximum = this.find_max_value();
        },

        find_max_value() {

            objects = [{
                id: 0,
                nom: '',
                valeur: 0,
                poids: 0
            }];
            this.objects.map(o => objects.push(o));
            console.log(objects);
            rows = objects.length;
            columns = parseInt(this.poids_maximum) + 1;
            let matrice = Array(rows).fill().map(() => Array(columns).fill(0));

            for (i = 0; i < rows; i++) {
                for (j = 0; j < columns; j++) {
                    if (i == 0 || j == 0) {
                        matrice[i][j] = 0
                    } else if (j < objects[i].poids) {
                        matrice[i][j] = matrice[i - 1][j]
                    }
                    else {
                        matrice[i][j] = Math.max(matrice[i - 1][j], parseInt(matrice[i - 1][j - objects[i].poids]) + parseInt(objects[i].valeur));
                    }

                }
            }
            console.log(matrice);
            return matrice[rows - 1][columns - 1];
        }
    }

})
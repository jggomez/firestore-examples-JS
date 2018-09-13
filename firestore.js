
class UserDAO {

    constructor() {
        this.db = firebase.firestore();
        const settings = { timestampsInSnapshots: true };
        this.db.settings(settings);
    }

    add(user, id) {
        this.db.collection("usuarios").doc(id).set({
            nombre: user.nombre,
            apellidos: user.apellidos,
            email: user.email,
            valorFacturado: user.valorFacturado,
            tecnico: user.tecnico
        });
    }

    addWithKey(user) {
        this.db.collection("usuarios").add({
            nombre: user.nombre,
            apellidos: user.apellidos,
            email: user.email,
            valorFacturado: user.valorFacturado,
            tecnico: user.tecnico
        }).then(docRef => {
            console.log(`UID is => ${docRef.id}`);
        });
    }

    addWithMerge(numHectareas, idUser) {
        this.db.collection("usuarios").doc(idUser).set({
            numHectareas: numHectareas
        }, { merge: true });
    }

    update(idUser, numHectareasNew) {
        let refUser = this.db.collection("usuarios").doc(idUser);

        refUser.update({
            numHectareas: numHectareasNew
        })
    }

    updateObject(idUser) {
        let refUser = this.db.collection("usuarios").doc(idUser);

        refUser.update({
            "tecnico.email": "cambiotecnico@gmail.com"
        });
    }

    deleteFields(idUser) {
        this.db.collection('usuarios').doc(idUser).update({
            valorFacturado: firebase.firestore.FieldValue.delete()
        });
    }

    delete(idUser) {
        this.db.collection('usuarios').doc(idUser).delete();
    }

    querySingleUser(idUser) {
        let ref = this.db.collection("usuarios").doc(idUser);
        ref.get().then(respDoc => {
            console.log(`querySingleUser => ${respDoc.data().nombre}`);
        });
    }

    queryUserByName(name) {
        this.db.collection("usuarios")
            .where("nombre", "==", name)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    console.log(`queryUserByName => ${doc.data().nombre}`);
                });
            })
    }

    allUsers() {
        this.db.collection("usuarios")
            .orderBy("nombre", "asc")
            .limit(2)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    console.log(`allUsers => ${doc.data().nombre}`);
                });
            })
    }

    queryUserByNameAndLastName(name, lastName) {
        this.db.collection("usuarios")
            .where("nombre", "==", name)
            .where("apellidos", "==", lastName)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    console.log(`queryUserByNameAndLastName => ${doc.data().nombre}`);
                });
            })
    }

    listenerUser(idUser) {
        this.db.collection("usuarios").doc(idUser)
            .onSnapshot(doc => {
                console.log("User cambiado: ", doc.data());
            });
    }

}

const userDAO = new UserDAO();

/*userDAO.add({
    nombre: "pedro",
    apellidos: "torres",
    email: "pedro@gmail.com",
    valorFacturado: 420000,
    tecnico: { nombre: "tecnico1", email: "tecnico1@gmail.com" }
}, "14638228")*/

/*userDAO.addWithKey({
    nombre: "juan",
    apellidos: "gomez",
    email: "juan@gmail.com",
    valorFacturado: 420000,
    tecnico: { nombre: "tecnico2", email: "tecnico2@gmail.com" }
})*/

//userDAO.addWithMerge(5, '14638228');

//userDAO.update('14638228', 40);

//userDAO.updateObject("14638228");

//userDAO.querySingleUser("14638228");

//userDAO.queryUserByName("pedro");

//userDAO.queryUserByNameAndLastName("pedro", "torres")

//userDAO.allUsers();

//userDAO.listenerUser("14638228");

//userDAO.deleteFields("14638228");

//userDAO.delete("14638228");



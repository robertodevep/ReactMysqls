  // original
  import express from 'express' // Un framework pour Node.js qui facilite la création de serveurs web et d'API.
  import mysql from 'mysql'
  import cors from 'cors' //  Un middleware qui permet de gérer les restrictions de partage des ressources entre différentes origines (Cross-Origin Resource Sharing).
  const app = express();
  app.use(cors());
  app.use(express.json())

  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'crud'
  })

  app.get('/', (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, result)=> {
        if(err) return res.json({Message: "error inside server"})
        return res.json(result);
    })
  })

 /* orig app.post('/student', (req, res)=> {
    const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?, ?)";
    // sql : La requête SQL utilise une syntaxe avec des valeurs paramétrées (VALUES (?)) pour éviter les injections SQL.!:
    const vlaues = [ 
        req.body.nom,
        req.body.email
    ];
    db.query(sql, [vlaues], (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
  })*/


    
app.post('/student', (req, res) => {
    console.log("Received a POST request to /student"); // added a console log
    console.log("Request body:", req.body); // log the request body

    const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?, ?)";
    const values = [req.body.nom, req.body.email];
  
    db.query(sql, values, (err, result) => {
        if (err) {
             console.error("Error during database operation:", err); // log any errors to the console
          return res.status(500).json({ message: 'Erreur lors de l\'insertion des données', error: err });
        }
          console.log("Student added successfully:", result); // log success to the console

        return res.json({ message: 'Étudiant ajouté avec succès', data: result });
      });
    });


    // Serveur
 /*app.post('/student', (req, res) => {
    const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?, ?)";
    const values = [req.body.nom, req.body.email];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de l\'insertion des données', error: err });
      }
  
      return res.json({ message: 'Étudiant ajouté avec succès', data: result });
    });
  });*/

  app.get('/read/:id', (req, res) => { // Définit l'URL de la route. Le segment :id est un paramètre dynamique.
    const sql = "SELECT * FROM student WHERE ID = ?";
    const id = req.params.id
     // req.params : Contient les paramètres dynamiques de l'URL.
     // req.params.id : Récupère la valeur du paramètre id spécifié dans l'URL.
    db.query(sql,[id], (err, result)=> {
     // [id] : Remplace le ? dans la requête par la valeur de id. Cela sécurise la requête contre les injections SQL.
        if(err) return res.json({Message: "error inside server"})
        return res.json(result);
    })
  })

  /* app.put('/update/:id', (req, res) => {
     const sql = 'UPDATE student SET `Name`=?, `Email`=? WHERE ID=?';
     const id = req.params.id;
     db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
     })
   })*/

    

// Serveur Node.js
/*app.put('/update/:id', (req, res) => {
    const sql = 'UPDATE student SET `Name`=?, `Email`=? WHERE ID=?'; // Correction de 'UDAPTE' en 'UPDATE'
    const id = req.params.id;
    db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
        if (err) {
            console.error(err); // Ajout d'un log d'erreur pour le débogage
            return res.status(500).json({ Message: "Error inside server" }); // Changement du statut de réponse
        }
        return res.json(result);
    });
});*/


app.put('/update/:id', (req, res) => {
    const { name, email } = req.body; // Extraction des données du corps de la requête.
    const id = req.params.id; // Récupération de l'ID des paramètres de l'URL.

    // Vérification des données fournies.
    if (!name || !email || !id) {
        return res.status(400).json({ message: "Invalid data provided." });
    }

    const sql = 'UPDATE student SET Name = ?, Email = ? WHERE ID = ?';
    db.query(sql, [name, email, id], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ message: "Server error." });
        }
        return res.json({ message: "Update successful", result });
    });
});

  app.delete('/delete/:id', (req, res) => {

      const sql = "DELETE FROM student WHERE ID = ?";
      const id = req.params.id;
      db.query(sql, [id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"})
            return res.json(result);
        
      })
  }) 


  app.listen(8081, ()=> {
    console.log("Listening");
  })

    /*app.get('/read/:id', (req, res) => {
        const sql = "SELECT * FROM student WHERE ID = ?";
        const id = req.params.id; // Récupération du paramètre dynamique ':id'
    
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error("Database query error:", err);
                return res.status(500).json({ message: "Error inside server" }); // Statut 500 pour indiquer une erreur serveur
            }
            if (result.length === 0) {
                return res.status(404).json({ message: "Student not found" }); // Statut 404 si aucun étudiant n'est trouvé
            }
            return res.status(200).json(result); // Renvoi des résultats avec un statut 200
        });
    });*/
    

 
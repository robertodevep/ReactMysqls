
 import React, { useEffect } from 'react';
 import { useState } from 'react';
 import axios from 'axios';
 import { Link } from 'react-router-dom';
 


 function Home() {
          
      const [data, setData] = useState([])
    useEffect(()=> {
        axios.get('http://localhost:8081/') // Fait une requête GET vers l'API à l'adresse http://localhost:8081/.
        .then(res => setData(res.data))
        // Si la requête réussit, la réponse (res.data) contient la liste des étudiants, et elle est enregistrée dans l'état data via setData
        .catch(err => console.log(err));
    }, []) // Le tableau vide indique que l'effet doit s'exécuter une seule fois, lors du premier rendu du composant.
     /* const handleDelete = (id) => {
        axios.get(`http://localhost:8081/delete/${id}`)
        .then(res => {
            location.reload();
        })
        .catch(err => console.log(err))
      }*/
        const handleDelete = (id) => {
            // Utilisation de DELETE au lieu de GET

              if(window.confirm("voulez vous vraiment supprimer cet Etudiant ? .")){
                axios.delete(`http://localhost:8081/delete/${id}`)
                .then(res => {
                    // Met à jour l'état pour supprimer l'élément de la liste sans recharger la page
                    setData(data.filter(student => student.ID !== id));
                   
                })
                .catch(err => console.log(err));
        };

              }
                
     return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='W-50 bg-white rounded P-3'>
                <h2>Student List</h2>
                <div className='d-flex justify-content-end'>
                   <Link to="/Create" className="btn btn-success">Create +</Link>
                 </div>
                <table className='table' border='1'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((student, index) => {
                            return <tr key={index}>
                                <td>{student.ID}</td> 
                                <td>{student.Name}</td>
                                <td>{student.Email}</td>
                                <td>
                                    <Link to={`/read/${student.ID}`} className='btn btn-sm btn-info'>READ</Link>
                                    <Link to={`/edit/${student.ID}`} className='btn btn-sm btn-primary mx-2'>EDIT</Link>
                                    <button onClick={ () => handleDelete(student.ID)} className='btn btn-sm btn-danger'>DELETES</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
     )
 }

 export default Home
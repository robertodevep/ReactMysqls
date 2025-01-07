  import React, { useEffect } from 'react';
  import { useState } from 'react';
  import axios from 'axios';
  import { useParams } from 'react-router-dom';
  import { Link } from 'react-router-dom';

  function Read(){
    const { id } = useParams(); // Retourne un objet contenant les paramètres de l'URL
    // const { id } : Déstructure l'objet pour extraire directement la valeur du paramètre id
    const [student, setStudent] = useState([])
    useEffect(()=> {
        axios.get(`http://192.168.241.253:8081/read/${id}`) // Effectue une requête HTTP GET vers le backend à l'URL donnée.
        .then(res => {
            // res contient la réponse du serveur.
            //res.data contient les données renvoyées par le backend.
            //setStudent(res.data[0]) met à jour l'état avec les informations de l'étudiant (on suppose ici que les données sont dans le premier élément d'un tableau).
            console.log(res)
            setStudent(res.data[0]);
        })
        .catch(err => console.log(err))
    }, [])
     return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded P-5'>
                <div className='p-4'>
                 <h2>Student detail</h2>
                 <h2>{student.ID}</h2>
                 <h2>{student.Name}</h2>
                 <h2>{student.Email}</h2>
                </div>
                <div className='mt-3 ms-5'>
                   <Link to="/" className='btn btn-primary me-2'>Back</Link>
                   <Link to={`/edit/${student.ID}`} className='btn btn-info'>Edit</Link>
                </div>
            </div>
        </div>
     )
  }

  export default Read

  
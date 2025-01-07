 import React, { useState } from 'react'
 import axios from 'axios';
import { useNavigate } from 'react-router-dom';

 function Create(){

     const [formData, setFormData] = useState({
        nom: '',
        email: ''
     });

        const [errors, setErrors] = useState({});
        const navigate = useNavigate();


       

         const handleChanges = (e) => {
           // extraire le nom et la valeurs du champ modifier  a partire de l'evenmt (e)
            const { name, value } = e.target;
            setFormData(prevState => ({ ...prevState, [name]: value}));
            // ...prevState preserve les valeurs saisie,  [name]: value mise ajour des valeurs saisis
            setErrors({ ...errors, [name]: ''});
        };

        const validateForm = () => {
            let newErrors = {};

            // validation du nom

            if(!formData.nom){
                newErrors.nom = 'Veuillez remplir ce champ';
            } else if(!/^[a-zA-Z]+$/.test(formData.nom)){
                newErrors.nom = 'nom invalide';
            }

            // Validation de l'email
            if (!formData.email) {
               newErrors.email = "Ce champ est obligatoire";
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Adresse email invalide";
            }
            return newErrors;
            };

            const handleSubmit = (e) => {
                e.preventDefault();
                
                // Appelle la fonction de validation et stocke les erreurs retournées dans newErrors
                const newErrors = validateForm();
                setErrors(newErrors);
        
                // Vérifie s'il y a des erreurs avant d'envoyer les données
                if (Object.keys(newErrors).length === 0) {
                    axios.post('http://localhost:8081/student', formData) // Correction ici : utilisez formData au lieu de values
                        .then(res => {
                            console.log(res);
                            setFormData({ nom: '', email: '' }); // Réinitialise le formulaire après soumission
                            navigate('/'); // Redirige vers la page d'accueil ou une autre page après soumission réussie
                        })
                        .catch(err => console.log(err)); // Gère les erreurs de la requête
                }
            };

       /* orig const handleSubmit = (e) => {
            e.preventDefault();
            //  // appelle la fonction de validation et stock les erreurs retourne ds newErros
            const newErrors = validateForm();
            setErrors(newErrors);
            if (Object.keys(newErrors).length === 0) {
            axios.post('http://localhost:8081/student', formData)

                then(res => {
                    console.log(res);
                    setUserData(prevData => [...prevData, formData]);
                // met a jour userData en ajoutant les nouvelle donnees d'utilisteur (formData) au table existant
                setFormData({ nom: '', email: '' })
                    navigate('/')

                })  // si la requette reussi la reponse du serveur est afficher dans la console
                
                .catch(err => console.log(err));
        }};*/
                
            
            // Effectue une requête HTTP POST vers l'URL spécifiée (http://localhost:8081/student).
            // Envoie l'objet values (contenant les champs name et email) comme données.
               /* .then(res => {
                    console.log(res);
                    navigate('/')

                })  // si la requette reussi la reponse du serveur est afficher dans la console
                
                .catch(err => console.log(err));
        };*/
    
    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Student</h2>
                    <div className='mb-1'>
                        <label htmlFor="nom">Name</label>
                        <input type="text" name='nom' value={formData.nom} onChange={handleChanges} placeholder='Enter Name' className='form-control'/>
                        <span style={{ color: 'red' }}>{errors.nom}</span><br />
                    </div>
                    <div className='mb-1'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' value={formData.email} onChange={handleChanges} placeholder='Enter Email' className='form-control'/>
                        <span style={{ color: 'red' }}>{errors.email}</span><br />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    )
 }

 export default Create
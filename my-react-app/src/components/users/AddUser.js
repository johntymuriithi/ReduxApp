import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import {addUser} from "./usersSlice"
import { useNavigate } from 'react-router-dom';




export default function AddUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [company, setCompany] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [status, setStatus] = useState('idle');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const canSave = [name, email, username, number, company, street].every(Boolean) && status === 'idle';
    

    const saveClicked = () => {
        if (canSave){
            try{
               
                const newUser = {name, username, email, number, company, street};
                setStatus('pending');

                dispatch(addUser(newUser)).unwrap();
                

                setName('');
                setEmail('');
                setUserName('');
                navigate('/');

            } catch(err)
            {
                console.log("Failed to save the user", err);
            } finally{
                setStatus('idle');
            }
        }
    }
    const addName = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const addEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const addUserName = (e) => {
        e.preventDefault();
        setUserName(e.target.value);
    }

    const addCompany = (e) => {
        e.preventDefault();
        setCompany(e.target.value);
    }
    const addStreet = (e) =>{
        e.preventDefault();
        setStreet(e.target.value);
    }
    const addNUmber = (e) =>{
        e.preventDefault();
        setNumber(e.target.value);
    }
  return (
    <>
    <section>
        <main>
        <div>
            <h2 className='here'>Add User Here!!</h2>
        </div>
        <form>
            <label htmlFor='name'>Name:</label>
            <input
                name='name'
                id='name'
                type='text'
                value={name}
                onChange={addName}
            />
            <label htmlFor='email'>Email:</label>
            <input 
                id='email'
                name='email'
                type= 'email'
                value={email}
                onChange={addEmail}
            />
            <label htmlFor='username'>UserName:</label>
            <input 
                id='username'
                name='username'
                type='text'
                value={username}
                onChange={addUserName}
            />
             <label htmlFor='number'>NUmber:</label>
            <input 
                id='number'
                name='company'
                value={number}
                type='number'
                onChange={addNUmber}
            />
            <label htmlFor='company'>Company Name:</label>
            <input 
                id='company'
                name='company'
                value={company}
                type='text'
                onChange={addCompany}
            />
            <label htmlFor='street'>Street:</label>
            <input 
                id='street'
                name='street'
                type='text'
                value={street}
                onChange={addStreet}
            />

            <button type='button' onClick={saveClicked}>Save User</button>
        </form>
        </main>
    </section>
    </>
  )
}

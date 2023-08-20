import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteUser, selectUserById, updateUser} from './usersSlice';


export default function EditUsers() {

    const {userId} = useParams();
    const navigate = useNavigate();

    const user = useSelector((state) => selectUserById(state, Number(userId)));

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [username, setUserName] = useState(user?.username);
    const [company, setCompany] = useState(user?.companyName);
    const [street, setStreet] = useState(user?.street);
    const [number, setNumber] = useState(user?.phone);
    const [status, setStatus] = useState('idle');

    const dispatch = useDispatch();

    if (!user)
    {
        return (
            <section>
                <h1>Page not Found</h1>
            </section>
        )
    }

    const canSave = [name, email, username, number, company, street].every(Boolean) && status === 'idle';
    

    const saveClicked = () => {
        if (canSave){
            try{
               
                const newUser = {id: user.id, name, username, email, number, company, street};
                setStatus('pending');

                dispatch(updateUser(newUser)).unwrap();
                

                setName('');
                setEmail('');
                setUserName('');
                navigate(`/users/${userId}`);
            } catch(err)
            {
                console.log("Failed to save the user", err);
            } finally{
                setStatus('idle');
            }
        }
    }


    const deleteClicked = () => {
        if (canSave){
            try{
               
                const newUser = {id: user.id};
                setStatus('pending');

                dispatch(deleteUser(newUser)).unwrap();
                

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
            <h2 className='here'>Update User Here!!</h2>
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
             <label htmlFor='phone'>NUmber:</label>
            <input 
                id='phone'
                name='phone'
                value={number}
                // type='number'
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
            <button type='button' onClick={deleteClicked}>Delete User</button>
        </form>
        </main>
    </section>
    </>
  )
}
import React from "react"
import UsersList from "./components/users/usersList"
import AddUser from "./components/users/AddUser"
import { Route, Routes } from 'react-router-dom';
import Layout from "./components/Layout";
import SingleUser from "./components/users/singleUser";
import EditUsers from "./components/users/EditPosts";

export default function App() {  
  return (
   <Routes>
    <Route path="/" element={<Layout />}>

      <Route index element={<UsersList />} />

      <Route path="users">

      <Route index element={<AddUser />} />
      <Route path=":userId" element={<SingleUser />} />
      <Route path="edit/:userId" element={<EditUsers />} />

      </Route>

    </Route>
   </Routes>
  )
}

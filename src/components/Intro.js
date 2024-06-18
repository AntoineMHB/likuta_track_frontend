import React, { useState } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

//library
import { UserPlusIcon } from '@heroicons/react/24/solid';

//assets
import axios from 'axios';
import illustration from "../assets/illustration.jpg";

const Intro = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/users/login', { username, password });
      localStorage.setItem('user', JSON.stringify(response.data)); //here we store user details in the localStorage
      toast.success("Login successful!");
      navigate('/theDash'); // Redirect to dashboard
    } catch (error) {
      toast.error("Invalid username  or password");
      }
  };

  return (
  <div className="intro">
      <div>
        <h1>
          Budget Better, <span className="accent">Live Brighter! </span>
        </h1>
        <p>
            Personal budgeting is the secret to financial freedom. 
            Start your journey today.
        </p>
   
   <Form onSubmit={handleLogin}>
    <input 
        type="text" 
        name="username" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required 
        placeholder="Enter your username"
        aria-label="Username" 
        autoComplete="username" 
    />
    <input 
        type="password" 
        name="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required 
        placeholder="Enter your password"
        aria-label="Password" 
        autoComplete="current-password" 
    />
    <button type="submit" className="btn btn--dark">
        <span>Login</span>
        <UserPlusIcon width={20}/>
    </button>          
</Form>

<p>If you don't have an account, you can sign up</p>
<Link to="/signup" className="btn btn--primary"> {/* Use Link for client-side navigation */}
          <span>Sign Up</span>
          <UserPlusIcon width={20}/>
</Link>

      </div>
      <img src={illustration} alt="Person with money"
      width={600} />
    </div>
  )
}

export default Intro;

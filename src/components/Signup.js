import { UserPlusIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { registerUser } from '../actions/registration';
import illustration from "../assets/illustration.jpg";

const Signup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');

  const navigate = useNavigate();

  function saveUser(e) {
    e.preventDefault();

    const user = { firstname, lastname, email, username, password, usertype };
    console.log(user);

    registerUser(user, navigate);
      
      }
      
  

  return (
   <div className="signup-page">
  <div className="signup-card">
    <h2 className="signup-title">Sign Up</h2>
    <Form method="post" action="/" onSubmit={saveUser} className="form-wrapper">
      <div className="form-row">
        <input
          type="text"
          name="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
          placeholder="First Name"
          aria-label="First Name"
          autoComplete="given-name" />
        <input
          type="text"
          name="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
          placeholder="Last Name"
          aria-label="Last Name"
          autoComplete="family-name" />
      </div>
      <div className="form-row"> {/* Add this div for the last name field */}
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email Address"
          aria-label="Email Address"
          autoComplete="email" />
      </div>
      <div className="form-row"> {/* Add this div for the username field */}
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username"
          aria-label="Username"
          autoComplete="username" />
      </div>
      <div className="form-row"> {/* Add this div for the password field */}
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          aria-label="Password"
          autoComplete="new-password" />
      </div>
      <div className="form-row"> {/* Add this div for the user type select */}
        <select
          name="usertype"
          value={usertype}
          onChange={(e) => setUsertype(e.target.value)}
          required
        >
          <option value="">Select User Type</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
      </div>

      <button type="submit" className="btn btn--dark"> {/* Adjust button placement */}
        <span>Sign Up</span>
        <UserPlusIcon width={20} />
      </button>
    </Form>
  </div>
  <img src={illustration} alt="Person with money" width={600} />
</div>

  );
}

export default Signup;

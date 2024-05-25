import React, { useState, useRef }  from 'react';
 
 // assets
import logomark from "../assets/logomark.svg"

// react router dom imports
import { Form, NavLink, useNavigate } from 'react-router-dom'

// library
import { TrashIcon } from '@heroicons/react/16/solid';
import { logoutAction } from '../actions/logout';

// Here I custom the Confirmation Dialog
const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirmation-dialog"
             style={{
               position: 'fixed',
               top: '50%',
               left: '50%',
               transform: 'translate(-50%, -50%)',
               backgroundColor: 'white',
               padding: '20px',
               border: '1px solid #ccc',
               borderRadius: '5px',
               boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
               textAlign: 'center',
               zIndex: 1000,
             }}
        >
            <p>{message}</p>
            <div className="buttons">
                <button 
                   onClick={onConfirm}
                   style={{
                     padding: '8px 16px',
                     margin: '0 10px',
                     backgroundColor: '#f44336',
                     color: 'white',
                     border: 'none',
                     borderRadius: '5px',
                     cursor: 'pointer',
                   }}     
                >Confirm</button>
                <button 
                    onClick={onCancel}
                    style={{
                        padding: '8px 16px',
                        margin: '0 10px',
                        backgroundColor: '#2196f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >Cancel</button>
            </div>
        </div>
    );
};

 const Nav = ({ userName }) => {
   const [showConfirmation, setShowConfirmation] = useState(false);
   const formRef = useRef(null);
   const navigate = useNavigate();

   const handleLogout = (event) => {
    event.preventDefault(); //we prevent the form submission
    setShowConfirmation(true);
   };

   const handleConfirm = () => {
    setShowConfirmation(false);
    logoutAction(navigate);    
  };

   const handleCancel = () => {
    setShowConfirmation(false);
   };

   return (
     <nav>
        <NavLink to="/" aria-label="Go to home">
            <img src={logomark} alt="" height={30} />
            <span>LIKUTA Track</span>
        </NavLink> 
        {userName && (
            <Form method="post" action="/logout" onSubmit={handleLogout} ref={formRef}>
                <button type="submit" className="btn btn--warning">
                    <span>Delete User</span>
                    <TrashIcon width={20} />
                </button>
            </Form>
        )}
        {showConfirmation && (
            <ConfirmationDialog
              message="Delete user and all data?"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
        )}
     </nav>
   )
 }
 
 export default Nav
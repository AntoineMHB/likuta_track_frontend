import React from 'react';

const TheSidebar = ({ data }) => {
  return (
    <div className="TheSidebar">
   
        {data.map((val, key) => {
          return (
            <div key={key} onClick={() => { window.location.pathname = val.link }}>
              
            </div>
          );
        })}
    </div>
  );
};

export default TheSidebar;

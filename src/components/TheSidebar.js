import React from 'react';

import { SidebarData } from './SidebarData';
function TheSidebar() {
  return (
    <div className="TheSidebar">
       <ul>
    {SidebarData.map((val, key)=> {
      return (
        <li key={key} onClick={()=>{window.location.pathname = val.link}}> 
          {" "}
        <div>{val.icon}</div>{" "}
        <div>
          {val.title}
        </div>
        </li>);

      
    })}
    </ul>
    </div>
  )
}

export default TheSidebar;
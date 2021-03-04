 import React from 'react';



const Success = (props) =>{
    return (
      <div>
      <h1>Account Created, Check Your Email</h1>
      <h3>Click on the link sent to your email to verify account</h3>
        <button onClick={props.history.push('/')}>Login</button>
      </div>
    );
  }

 export default Success;
import React from 'react';

const CardContainer = ({ children }) => (
  <div className="card">
    <div className="card-block">
      {children}
    </div>
  </div>
);


export default CardContainer;

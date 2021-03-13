import React, { useRef } from "react";

import "./User.scss";

const User = (props) => {
  const { imgSrc = "", changeUser = () => {} } = props;

  const userRef = useRef();

  return (
    <div className="user" ref={userRef}>
      <div className="container">
        <img src={imgSrc} alt="user" />

        <div className="info">
          <div className="top">
            <span className="name">Lynk</span>
            <div className="age">
              <span>20</span>
              <i class="fa fa-birthday-cake" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
      User
    </div>
  );
};

export default User;

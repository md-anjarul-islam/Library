import React, { useState } from "react";

function userHook(userInfo) {
  console.log("user state");

  const [user, handler] = useState({});

  const userHandler = () => {
    fetch(`http://localhost:3001/api/users/${userInfo.id}`, {
      method: "POST",
      body: JSON.stringify(userInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        handler(data);
        console.log("login data", data);
        //   localStorage.setItem("token", data)
      });
  };
  return [user, userHandler];
}

export default userHook;

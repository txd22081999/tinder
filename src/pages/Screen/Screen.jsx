import React, { useEffect, useState } from "react";

import User from "../../components/User";

import "./Screen.scss";

const imgSrcList = [
  "https://thoughtcatalog.com/wp-content/uploads/2018/05/questionstoaskagirl2.jpg?w=1920&h=1280&crop=1&resize=1920,1280&quality=95&strip=all",
  "https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv-1024x1016.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7L4SiMA74nneLxL_cTOrz5g3LGAzBT2t5bA&usqp=CAU",
];

const userList = [
  {
    name: "Lynk",
    imgSrc: imgSrcList[0],
  },
  {
    name: "Kylie",
    imgSrc: imgSrcList[1],
  },
  {
    name: "Jean",
    imgSrc: imgSrcList[2],
  },
];

const Screen = () => {
  const [current, setCurrent] = useState(0);
  const [user, setUser] = useState(userList[current]);

  useEffect(() => {
    if (current < 0 || current > userList.length - 1) return;
    setUser(userList[current]);
  }, [current]);

  const changeUser = () => {
    setCurrent((prev) => prev + 1);
  };

  const { imgSrc = "" } = user;
  return (
    <div className="screen">
      Screen
      <User imgSrc={imgSrc} changeUser={changeUser} />
    </div>
  );
};

export default Screen;

import React, { useEffect, useState } from "react";
import axios from "axios";
import UserInfo from "./components/userInfo/UserInfo";
import "./App.css";

function App() {

  const url="https://randomuser.me/api";

  type userData={
    name:string,
    email : string,
    dob:string,
    phone:string,
    image:string
    address:string
  }  
  const [userInfo,setUserInfo]=useState<userData | null>(null);
  const [loading,setLoading]=useState<boolean>(false);

  const buttonClick=():void=>{
    fetchData();
  }

  function setData(userData: any) {
    if (userData) {
      const name = `${userData.name.title} ${userData.name.first} ${userData.name.last}`;
      const address = `${userData.location.street.number} ${userData.location.street.name}, ${userData.location.city}, ${userData.location.state}, ${userData.location.country} - ${userData.location.postcode}`;
      const dob = new Date(userData.dob.date);
      const dobFormatted = `${dob.getDate()}-${dob.getMonth() + 1}-${dob.getFullYear()}`;
      const email = userData.email;
      const phone = userData.phone;
      const image = userData.picture.large;
      setUserInfo({
        name,
        email,
        dob:dobFormatted,
        phone,
        image,
        address
      });
      setLoading(false);
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      const data = response.data.results;
      setData(data[0]);
      localStorage.setItem('userInfo',JSON.stringify(data[0]));
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className="app">
     {(loading===true || userInfo===null) ?<div>Loading...</div> :<UserInfo
        name={userInfo.name}
        email={userInfo.email}
        phone={userInfo.phone}
        address={userInfo.address}
        dateOfBirth={userInfo.dob}
        image={userInfo.image}
        buttonClick={buttonClick}
      />}
    </div>
  );
}

export default App;

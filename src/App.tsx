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
      const {name,location,dob,email,phone,picture}=userData
      const fullName = `${name.title} ${name.first} ${name.last}`;
      const fullAddress = `${location.street.number} ${location.street.name}, ${location.city}, ${location.state}, ${location.country} - ${location.postcode}`;
      const dateOfBirth = new Date(dob.date);
      const dobFormatted = `${dateOfBirth.getDate()}-${dateOfBirth.getMonth() + 1}-${dateOfBirth.getFullYear()}`;
      const imageUrl = picture.large;
      setUserInfo({
        name:fullName,
        email,
        dob:dobFormatted,
        phone,
        image:imageUrl,
        address:fullAddress
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
      // setLoading(false);
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

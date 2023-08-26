import React from "react";
import styles from "./UserInfo.module.css";
import { ReactComponent as Phone } from "../../assets/phone-call.svg";
import { ReactComponent as Email } from "../../assets/email1.svg";

type propsType = {
  name?: string;
  image?: string;
  phone?: string;
  email?: string;
  dateOfBirth?: string;
  address?: string;
  buttonClick: () => void;
};

function UserInfo(props: propsType) {
  const { name, image, phone, email, dateOfBirth, address } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={props.image} alt="women" />
      </div>

      <h3 className={styles.name}>{name}</h3>
      <div className={styles.dob}>
        <p>{dateOfBirth}</p>
      </div>
      <div className={styles.para}>
        <div className={styles.container}>
          <Phone />
          <p>{phone}</p>
        </div>

        <div className={styles.container}>
          <Email />
          <p>{email}</p>
        </div>
      </div>
      <p className={styles.address}>{address}</p>

      <button className={styles.button} onClick={props.buttonClick}>
        Refresh
      </button>
    </div>
  );
}

export default UserInfo;

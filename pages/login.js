import styles from "@/styles/login.module.css";
import { useState } from "react";
export default function login() {
  const [error, seterror] = useState("");
  function login() {
    let login = document.getElementById("Login").value;
    let pass = document.getElementById("Pass").value;
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login: login, pass: pass }),
    })
      .then((response) => {
        if (response.status == 200) {
          window.location.href = "/logged/homepage";
        } else {
          return response.json(); 
        }
      
      })
      .then((data) => {
        
          seterror(data.status)
        
      });
  }
  return (
    <>
   
      <div className={styles.bodybackground}>
      <div className = {` ${styles.textfont} ${styles.covanta}`}>
        <h2>BreatheEasy</h2>
    </div>
        <div className={styles.loginbackground}>
          <h3 className={styles.logintitle}>Log in to Your Account</h3>
          <h5 className={styles.texttype}>Login ID</h5>
          <input id="Login" className={styles.boxes}></input>
          <h5 className={styles.texttype}>Password</h5>
          <input type="Password" id="Pass" className={styles.boxes}></input>
          <div className={styles.flexcenter}>
            <button className={styles.clickloginbutton} onClick={login}>
              Log in
            </button>
          </div>
          <div className={styles.newuser}>
            <a className={styles.newuser} href="/signup">
              New User?
            </a>
          </div>
          <div className={styles.error}>{error}</div>
        </div>
      </div>
    </>
  );
}

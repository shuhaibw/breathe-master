import styles from "@/styles/signup.module.css";
import { useState } from "react";
export default function Signup() {
    const [error, seterror] = useState(null);
    function signup() {
        let login = document.getElementById("Login").value;
        let pass = document.getElementById("Pass").value;
        let passcheck = document.getElementById("PassCheck").value;
        if (pass != passcheck) {
            seterror("Passwords do not match");
            return;
        }
        if(login == "" || pass == "" || passcheck == ""){
            seterror("Please fill out all fields");
            return;
        }
        seterror(null);
        fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ login: login, pass: pass }),
        }).then((response) => {

            if(response.status == 200){
                window.location.href = "/logged/homepage";
            }
            else{
                seterror("Username already exists");
            }
          });

    }
  return (
    <>
    
      <div className={styles.container}>
      <div className = {` ${styles.textfont} ${styles.covanta}`}>
        <h2>BreatheEasy</h2>
    </div>
        <div className = {styles.loginbackground} >
        <h3 className={styles.title}>Create Your Account</h3>
        <h5 className = {styles.texttype}> New Login ID</h5>
        <input className={styles.boxes} id = "Login"/>
        <h5 className={styles.texttype}>New Password</h5>
        <input className={styles.boxes} type = "password" id = "Pass"/>
        <h5 className={styles.texttype}>Confirm Password</h5>
        <input className={styles.boxes} type = "password" id = "PassCheck"/>
        <div className={styles.error}>
            {error}
        </div>
        <div className = {styles.flexcenter}>
          <button onClick={signup} href="home.js" className={styles.clickloginbutton}>Sign Up</button>
        </div>

        <div className={styles.newusercontainer}>
          <a className={styles.newuser} href="/login">
            Go back to Login
          </a>
        </div>
        </div>
      </div>
    </>
  );
}

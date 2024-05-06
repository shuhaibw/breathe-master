import { useEffect, useState } from "react";
import styles from "@/styles/assesshealth.module.css";
export default function Home() {
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        document.getElementById("healthAssessmentForm").addEventListener("submit", function(event) {
            event.preventDefault();
            setSubmit(true);
            const smoke = document.querySelector('input[name="smoke"]:checked').value;
            const pastSmoke = document.querySelector('input[name="pastSmoke"]:checked').value;
            const familyHistory = document.querySelector('input[name="familyHistory"]:checked').value;
            let risk = 0;
            let smokingRisk = "";
            if (smoke === "yes") {
                risk += 1;
                smokingRisk += "You are currently smoking, which increases your risk of developing smoking-related diseases.    ";
            } 
             if (pastSmoke === "yes") {
                risk += 1;
                smokingRisk += "You have smoked in the past, which may still increase your risk of developing smoking-related diseases.  ";
            } 
             if (familyHistory === "yes") {
                risk += 1;
                smokingRisk += "You have a family history of smoking-related diseases, which increases your risk of developing such diseases.   ";
            } if(smoke === "no" && pastSmoke === "no" && familyHistory === "no") {
                smokingRisk += "You do not currently smoke, have not smoked in the past, and do not have a family history of smoking-related diseases, which lowers your risk of developing such diseases.";
            }
            let riskword = "negligible";
            switch(risk) {
                case 1:
                    riskword = "low";
                    break;
                case 2:
                    riskword = "medium";
                    break;
                case 3:
                    riskword = "high";
                    break;
            }
            document.getElementById("riskword").textContent = `Your health risk is ${riskword}.`;
            document.getElementById("bar").style.width = `${risk * 33.33}%`;    
            document.getElementById("smokingRisk").textContent = smokingRisk;
            document.getElementById("assessmentResult").style.display = "block";
    
    })
});
    return (
    <>
        
        <div className={styles.bodybackground}>
    <div className = {` ${styles.textfont} ${styles.covanta}`}>
        <h2>BreatheEasy</h2>
    </div>
    <div>
             <a href="homepage" className={`${styles.returnshome}`}>Return to Homepage</a>
    </div>
    
        <title classname={styles.form}>Health Assessment Tool</title>
        
        <form className={styles.form} id="healthAssessmentForm">
        
            <label className={styles.label}>1. Do you currently smoke cigarettes?</label><br></br>
            <input className={styles.input} type="radio" name="smoke" value="yes" required/> Yes
            <input className={styles.input} type="radio" name="smoke" value="no"/> No<br></br>

            <label className={styles.label}>2. Have you ever smoked cigarettes in the past?</label><br></br>
            <input className={styles.input} type="radio" name="pastSmoke" value="yes" required/> Yes
            <input className={styles.input} type="radio" name="pastSmoke" value="no"/> No<br></br>

            <label className={styles.label}>3. Do you have a family history of smoking-related diseases (e.g., lung cancer, heart disease)?</label><br></br>
            <input className={styles.input} type="radio" name="familyHistory" value="yes" required/> Yes
            <input className={styles.input} type="radio" name="familyHistory" value="no"/> No<br></br>

            <input className={styles.input} type="submit" value="Submit"/>
            <div className={styles.form} id="assessmentResult">
            
            {submit && <h2 className={styles.h2}>Health Assessment Result</h2>}
            <p className={styles.p}  id="smokingRisk"></p>
            { <div id = "barcont" style = {{
                background: "lightgray",
                borderRadius: "45px",
                height: "30px",
                width: "100%",
            }}><div id = "bar" style = {{
                background: "linear-gradient(to right, green, yellow,  red)",
                
                borderRadius: "45px",
                height: "30px",
                width: "0",
                transition: "width 1s",
            }}></div>  </div>}
            <h2 className={styles.h2} id="riskword"></h2>
            
        </div>
        </form>
        
        </div>
        
        </>
    );
}
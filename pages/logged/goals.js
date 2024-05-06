import { useEffect } from "react";
import styles from "@/styles/goals.module.css";
export default function Home() {
  useEffect(() => {
    document
      .getElementById("goalForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();

        const age = parseInt(document.getElementById("age").value);
        const cigarettesPerDay = parseInt(
          document.getElementById("cigarettesPerDay").value
        );
        const quitDate = new Date(document.getElementById("quitDate").value);

        const quitAge =
          age + (quitDate.getFullYear() - new Date().getFullYear());
        const shortTermGoal = Math.ceil(cigarettesPerDay * 7 * 0.75);
        const longTermGoal = Math.ceil(cigarettesPerDay * 7 * 0.5);

        const outputDiv = document.getElementById("goalOutput");
        outputDiv.innerHTML = `
            <p>Short-term Goal: Reduce smoking to ${shortTermGoal} cigarettes per week by ${quitDate.toLocaleDateString()}</p>
            <p>Long-term Goal: Quit smoking completely by age ${quitAge}</p>
        `;
      });
    }, []);
  return (
    <>
    <div className={styles.bodybackground}>
    <div className = {` ${styles.textfont} ${styles.covanta}`}>
        <h2>BreatheEasy</h2>
    </div>
    <div>
             <a href="homepage" className={`${styles.returnshome}`}>Return to Homepage</a>
    </div>
      <form className={styles.form} id="goalForm">
        <label className={styles.label} for="age" >Your Age:</label>
        <input className={styles.input} type="number" id="age" name="age" required />

        <label className={styles.label} for="cigarettesPerDay">Cigarettes Smoked Per Day:</label>
        <input
          className={styles.input}
          type="number"
          id="cigarettesPerDay"
          name="cigarettesPerDay"
          required
        />

        <label className={styles.label} for="quitDate">Desired Quit Date:</label>
        <input className={styles.input} type="date" id="quitDate" name="quitDate" required />

        <button className={styles.button} type="submit">Set Goals</button>
      </form>

      <div id="goalOutput"></div>
      </div>
    </>
  );
}

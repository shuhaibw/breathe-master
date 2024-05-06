
import styles from "@/styles/homepage.module.css";
export default function Homepage() {
    return (<>
    
    <div className={styles.bodybackground}>
    <div className = {` ${styles.textfont} ${styles.covanta}`}>
        <h2>BreatheEasy</h2>
    </div>
    
    <div className = {styles.underlineanchors}>
        <img src ="../images/lung.jpg" alt="Search icon image" className={styles.imagesearch}/>
    </div>
       <div className = {styles.containerforbluetexts}>
        <a className={styles.one}  href="/logged/whytrack">Why Track?</a>
        <a className={styles.two} href="/logged/tracker">Progress Tracking</a>
        <a className={styles.three} href="/logged/goals">Goal Creator</a>
        <a className={styles.four} href="/logged/assesshealth">Health Assessment</a>
        <a className={styles.five} href="https://www.smokefree.gov/">Outside Resources</a>
        <a href="/signout" className = {`${styles.careersnews}  ${styles.anchordecoration}`}>Logout</a>
        
    </div>
    <div className = {styles.containerforunderline} >
    <div className = {styles.longunderline}></div>
    </div>
 
    <div className = {`${styles.textfont}  ${styles.title}`} id ='title'>
        <h1>Your Guide to Quitting Smoking</h1>
    </div>
    <div className={styles.background1}></div>
    <div className={styles.container1}>
    <div className = {`${styles.textfont}  ${styles.greentext}`}>
        <h2>Our Goal </h2>
    </div>
    <div className = {`${styles.textfont}  ${styles.firstpar}`}>
        <p>Our goal is to provide a comprehensive platform dedicated to supporting individuals in their journey to quit smoking and improve their overall health and well-being. Through a combination of informative resources and personalized tools, our site aims to empower users to make positive lifestyle changes, overcome the challenges of quitting smoking, and ultimately lead smoke-free lives. Whether you're seeking health analysis, trackers, or guidance on accessing further medical help, we're here to support you through every step of the way.</p>
    </div>
    </div>
    </div>
    </>
    
    );
}
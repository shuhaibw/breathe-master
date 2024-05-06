import styles from "@/styles/whytrack.module.css";
export default function Whytrack() {
   return (
       <div className={styles.wholebackground}>
           <div className={styles.containerinfo}>
               <div className={styles.infobackground}>
                   <h2 className={styles.headingtext}>Long-term Outcomes</h2>
                   <p>Tracking progress in quitting smoking has been shown to significantly improve long-term outcomes and reduce the likelihood of relapse. Studies have demonstrated that individuals who actively monitor their smoking cessation progress are more likely to achieve and maintain abstinence compared to those who do not track their progress. By continuously monitoring their efforts, individuals can identify areas for improvement, set realistic goals, and adjust their strategies accordingly. This iterative approach to quitting smoking increases self-awareness, resilience, and confidence, ultimately leading to greater success in achieving long-term tobacco abstinence and enjoying improved overall health and well-being.</p>
               </div>  
               <div className={styles.infobackground}>
                   <h2 className={styles.headingtext}>Staying Accountable</h2>
                   <p>Tracking progress in quitting smoking helps individuals to stay accountable and responsible for their actions. By regularly recording their efforts and setbacks, individuals take ownership of their journey towards a smoke-free life. This accountability fosters a sense of control and determination, empowering individuals to make informed decisions and resist the urge to smoke, even in challenging situations. Additionally, sharing progress updates with healthcare professionals, support groups, or loved ones can provide valuable encouragement and support, further enhancing the individual's chances of successfully quitting smoking.</p>
               </div>  
               <div className={styles.infobackground}>
                   <a href="/logged/homepage" className={styles.returnhome}>Return to Homepage</a>
                   <h2 className={styles.headingtext}>Celebrating Successes</h2>
                   <p>Tracking your quitting journey allows you to celebrate your successes, no matter how small. Each smoke-free day, reduced cigarette consumption, or successful coping mechanism is a victory worth acknowledging. Celebrating these milestones boosts your confidence and reinforces your commitment to quitting smoking for good.</p>
               </div>
           </div>
       </div>
   );
}
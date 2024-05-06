import styles from "@/styles/infopage.module.css";
export default function Home() {

    return (
    <>
        <div class="container">
        <h2>User Profile</h2>
        <form id="profileForm">
            <label for="fullName">Full Name:</label>
            <input type="text" id="fullName" name="fullName" required/>

            <label for="age">Age:</label>
            <input type="number" id="age" name="age" min="18" required/>

            <label for="gender">Gender:</label>
            <select id="gender" name="gender" required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>

            <label for="smokingHistory">Smoking History:</label>
            <input type="text" id="smokingHistory" name="smokingHistory" required/>

            <label for="quitDate">Quit Date:</label>
            <input type="date" id="quitDate" name="quitDate"/>

            <input type="submit" value="Save Profile" />
        </form>
    </div>

    </>
    );
}
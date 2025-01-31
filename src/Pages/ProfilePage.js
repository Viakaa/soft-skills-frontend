import UserInfo from "../Components/UserInfo/UserInfo.js";
import UserTests from "../Components/UserTests/UserTests.js";
import { Link } from 'react-router-dom';
import "./ProfilePage.css";

export default function ProfilePage(){
    return(
        <div>
          <UserInfo />
          {/* <UserTests /> */}
          <div className="test-results-container">
                <h3>Test Results</h3>
                <Link to="/belbinchart">
                    <button className="navigate-button"> Belbin Chart</button>
                </Link>
            </div>
        </div>
    );
}
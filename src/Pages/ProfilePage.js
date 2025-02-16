import UserInfo from "../Components/UserInfo/UserInfo.js";
import UserTests from "../Components/UserTests/UserTests.js";
import "./ProfilePage.css";

export default function ProfilePage(){
    return(
        <div>
          <UserInfo />
          <UserTests />
        </div>
    );
}
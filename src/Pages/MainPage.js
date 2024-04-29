import ProfileGraphic from "../Components/ProfileGraphic/ProfileGraphic.js";
import TestCards from "../Components/TestCards/TestCards.js";
import InformationCards from "../Components/InformationCards/InformationCards.js";

export default function MainPage(){
    return(
        <div style={{backgroundColor:'#F8FBFF'}}>
            <ProfileGraphic />
            <TestCards />
            <InformationCards />
        </div>
    );
}
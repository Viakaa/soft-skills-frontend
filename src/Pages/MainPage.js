import ProfileGraphic from "../Components/ProfileGraphic/ProfileGraphic.js";
import TestCards from "../Components/TestCards/TestCards.js";
import Footer from "../Components/Footer/Footer.js"
export default function MainPage(){
    return(
        <div style={{backgroundColor:'#F8FBFF'}}>
            <ProfileGraphic />
            <TestCards />
            <Footer/>
        </div>
    );
}
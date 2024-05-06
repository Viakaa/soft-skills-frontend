import ProfileGraphic from "../Components/ProfileGraphic/ProfileGraphic.js";
import TestCards from "../Components/TestCards/TestCards.js";
import PanelTabs from "../Components/AdminPanel/PanelTabs.js";

export default function AdminPage(){
    return(
        <div style={{backgroundColor:'rgba(242, 230, 215, 1)'}}>
          <PanelTabs/>
        </div>
    );
}
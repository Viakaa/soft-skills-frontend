import "./UserInfo.css";
import avatar from "../../Assets/Images/avatar.png";
export default function TestCards() {
  return (
    <>
      <div className="userinfo_main">
        <div class="container rounded mt-2 mb-5 userinfo" >
          <div class="row">
            <div class="col-md-3 border-right">
              <div class="d-flex flex-column align-items-center text-center p-3 ">
                <img
                  class="rounded-circle  "
                  src={avatar}
                />
                <span style={{marginTop:'10px'}} class="font-weight-bold">First name Second name</span>
              </div>
            </div>
            <div class="col-md-4 border-right ">
              <div class="p-3 ">
              <div className='basic_info'>

                <div class="row">
                  <div class="col-md-12">
                    <label class="labels">Role in Team</label>
                  
                  </div>
                  <div class="col-md-12">
                    <label class="labels">Phone Number</label>
             
                  </div>
                  <div class="col-md-12">
                    <label class="labels">Email</label>
             
                  </div>
                  <div class="col-md-12">
                    <label class="labels">Some other information</label>
             
                  </div>
                  </div>

                </div>
                <div style={{marginTop:'30px'}} className='basic_info'>
                <div class="row">
                
                  <div class="col-md-12">
                    <label class="labels">Test B Result</label>
                
                  </div>
                  
                </div>
                </div>
                
              </div>
            </div>
            <div class="col-md-5">
              <div class="p-3">

              <div  className='basic_info'>
                <div class="row">
                
                  <div class="col-md-12">
                    <label class="labels">emaildotcomesometxt@itstep.org</label>
                
                  </div>
                </div>
                </div>
                <div style={{marginTop:'20%'}} class="row text-center">
                
                <div class="col-md-12">
                  <button className='change_password_btn'>Change Password</button>
              
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

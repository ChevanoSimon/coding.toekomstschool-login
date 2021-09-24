import { AUTH_TOKEN } from '../../helper';
import { useHistory } from "react-router-dom";

const Outlogger = () => {
    const user = JSON.parse(localStorage.getItem(AUTH_TOKEN));
    const history = useHistory();
    return (
      
        <div className="profile-container">
          
          <h4>{user.user_display_name}</h4>
          
          <button className="btn btn-primary" 
          onClick={
              () => {
                localStorage.removeItem(AUTH_TOKEN); 
                history.push('/');
            }}>
            Log out
          </button>
        </div>
    )
  }
  
  export default Outlogger;
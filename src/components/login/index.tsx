import { FC } from 'react';

interface Props {
  id: string;
}

const Login: FC<Props> = ({ id }) => {
  return (
    <form action="action_page.php" method="post">
  <div className="imgcontainer">
    <img src="img_avatar2.png" alt="Avatar" className="avatar" />
  </div>
  <div className="container">
    <label htmlFor="uname"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="uname" required />
    <label htmlFor="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required />
    <button type="submit">Login</button>
    <label>
      <input type="checkbox" name="remember" /> Remember me
    </label>
  </div>
  <div className="container" >
    <button type="button" className="cancelbtn">Cancel</button>
    <span className="psw">Forgot<a href="https://ota.toekomst.school/wp-login.php?action=lostpassword">password?</a></span>
  </div>
</form>
  )
}

export default Login;
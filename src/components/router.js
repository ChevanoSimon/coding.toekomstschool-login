// import { useState } from 'react';
// import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginForm from './login/loginform'
import NotFound from './login/NotFound';
import ProtectedRoute from './login/ProtectedRoute';
import Environment from './environment';

// const StandardOpener = () => {

//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
  
//   axios.get("https://ota.toekomst.school/wp-json/wp/v2/codeprojects", {
//       params: { page: page, per_page: 5 }
//     }).then(response => {
//       setPosts(response.data);
//       console.log(response.data)
//     });
// }

const Router = () => (

  //StandardOpener(),

  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginForm} />
      <ProtectedRoute path="/coding/:id" component={Environment} />
      <ProtectedRoute path="/coding" component={Environment} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default Router;
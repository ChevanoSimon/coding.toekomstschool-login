import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/styling.css';
import { AUTH_TOKEN } from '../../helper'


//Chip = 1 - Chevano = 36
// let authorID = 36;

const CustomPostRetriever = () =>{
  let url = "https://ota.toekomst.school/wp-json/wp/v2/users/me"

  // Track state for posts, current page and number of pages
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [nrofpages, setNumberofpage] = useState(1);

  // When the page number changes call the api for posts.
  useEffect(() => {

    const user = JSON.parse(localStorage.getItem(AUTH_TOKEN));

      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
        mode: "no-cors"
      }

      axios.get(
            url,
            config
          ).then((Response) => {

      console.log(Response.data.id)

      axios.get("https://ota.toekomst.school/wp-json/wp/v2/codeprojects", {
      params: { page: page, per_page: 5, author: Response.data.id }
    }).then(response => {
      // Store the number of posible pages.
      setNumberofpage(response.headers["x-wp-totalpages"]);
      // Store the posts from the response.
      setPosts(response.data);
    });
    }, [page, setPosts]);
    }) 

  // Event handler: Decrease page count no lower then 1.
  const handlePrevPage = () => setPage(page - 1 ? page - 1 : 1);
  // Event handler: Increase page count no higher then nrofpages.
  const handleNextPage = () => setPage(page < nrofpages ? page + 1 : nrofpages);

  return (

    <div className="posts-app__wrapper">
      {nrofpages > 1 &&
        <div className="posts-app__post-nav">
          <button onClick={handlePrevPage}>Newer projects</button>
        </div>
      }

      <div className="posts-app__post-list">
        {posts &&
          posts.length ?
          posts.map((post, index) => {
            return (
              <div key={post.id} className="posts-app__post">
                <a href={"/coding/" + post.id} >
                  <h2>{post.title.rendered}</h2>
                </a>
              </div>
            );
          })
          : <p>Loading...</p>}
      </div>

      {nrofpages > 1 &&
        <div className="posts-app__post-nav">
          <button onClick={handleNextPage}>Older projects</button>
        </div>
      }

      {nrofpages > 1 &&
        <div>
          <p>
            Page {page} of {nrofpages}
          </p>
        </div>
      }
    </div>
  );
}

export default CustomPostRetriever;
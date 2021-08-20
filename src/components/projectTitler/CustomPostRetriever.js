import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomPostRetriever = () =>{

  // Track state for posts, current page and number of pages
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [nrofpages, setNumberofpage] = useState(1);

  // When the page number changes call the api for posts.
  useEffect(() => {
    axios.get("https://ota.toekomst.school/wp-json/wp/v2/codeprojects", {
      params: { page: page }
    }).then(response => {
      // Store the number of posible pages.
      setNumberofpage(response.headers["x-wp-totalpages"]);
      // Store the posts from the response.
      setPosts(response.data);
    });
  }, [page, setPosts]);

  // Event handler: Decrease page count no lower then 1.
  const handlePrevPage = () => setPage(page - 1 ? page - 1 : 1);
  // Event handler: Increase page count no higher then nrofpages.
  const handleNextPage = () => setPage(page < nrofpages ? page + 1 : nrofpages);

  return (
    <div className="posts-app__wrapper">
      <h1>Navigate codeprojects</h1>

      <div className="posts-app__post-nav">
        <button onClick={handlePrevPage}>Newer projects</button>
        <button onClick={handleNextPage}>Older projects</button>
        <p>
          Page {page} of {nrofpages}
        </p>
      </div>

      <div className="posts-app__post-list">
        {posts &&
          posts.length &&
          posts.map((post, index) => {
            return (
              <div key={post.id} className="posts-app__post">
                <h2>{post.title.rendered}</h2>
                <a href={post.link} target="_blank" rel="noreferrer">
                  Read post
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
}

// - SINGLE PAGE RETRIEVER - 

// import React, { Component } from 'react';
// class CustomPostRetriever extends Component {

//     constructor() {
//     super();
//     this.state = {
//       post: [],
//     };
//   }

//   componentDidMount() { 
//     axios.get('https://ota.toekomst.school/wp-json/wp/v2/codeprojects')
//     .then(response => {
//       this.setState({ post: response.data });
//       console.log(response.data)
//     })
//     .catch(error => {
//         console.log(error);
//     });
//     }

//   render() {
//     return (

//       <div>
//         {this.state.post.map(single => {
//             return(
//             <div>
//                 <label>Retrieved projects</label>
//                 <p>Project title: {single.title.rendered}</p>
//                 <p>Project ID: {single.content.rendered}</p>
//             </div>                                        
//             );
//         })}
//       </div>
//     );
//   }
// }

export default CustomPostRetriever;

// If api returns array then you can take only first element, f.e.:

// this.setState({ post: response.data[0] });
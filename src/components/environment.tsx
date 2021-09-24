import { FC, useEffect } from 'react';
import Split from 'split.js';
import { useParams } from 'react-router-dom';

// Styled Components
import GlobalStyles from '../styles/GlobalStyles';
import GlobalContainer from '../styles/GlobalContainer';
import MiddleContainer from '../styles/MiddleContainer';

// Context
import { Context } from '../context';

// Components
import Sidebar from './sidebar';
import Editor from './editor';
import Terminal from './terminal';
import Output from './output';
import axios from 'axios';

let savedTitle;
export const projectTitle = savedTitle;

const Environment: FC = () => {
  let { id } = useParams();
  
  useEffect(() => {
    Split(['#sidebar', '#code', '#output'], {
      gutterSize: 5,
      sizes: [13, 47, 40],
    });
    Split(['#editor', '#terminal'], {
      gutterSize: 5,
      direction: 'vertical',
      sizes: [70, 30],
    });
  }, []);


  const getSavedWork = () => {
    function componentDidMount() {
        if (id) {
          //console.log("id " + id)
          axios.get(`https://ota.toekomst.school/wp-json/wp/v2/codeprojects?include[]=${id}`, {
          params: { content: 'string', title: 'string' }
        }).then((Response) => {
          const data = Response.data;
          //console.log(data[0].acf.json)
          console.log(data)
    
          savedTitle = data[0].title.rendered;
    
          console.log(savedTitle)
    
          // plaats filedata in de editor
          // plaats titel op de juiste plek
          // als ik opsla, wil ik weer update ipv nieuwe
        })
      }
    }
    componentDidMount()
  }
  
  getSavedWork()
  
  return (
    <>
      <GlobalStyles />
      <Context>
        <GlobalContainer className="split">
          <Sidebar id="sidebar" projectTitle={savedTitle}/>
          <MiddleContainer id="code" className="split">
            <Editor id="editor" />
            <Terminal id="terminal" projectTitle="test" />
          </MiddleContainer>
          <Output id="output" />
        </GlobalContainer>
      </Context>
    </>
  );
};

export default Environment;
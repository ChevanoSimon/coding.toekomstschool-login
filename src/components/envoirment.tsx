import { FC, useEffect } from 'react';
import Split from 'split.js';

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

 
const Envoirment: FC = () => {
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

  return (
    <>
      <GlobalStyles />
      <Context>
        <GlobalContainer className="split">
          <Sidebar id="sidebar" />
          <MiddleContainer id="code" className="split">
            <Editor id="editor" />
            <Terminal id="terminal" />
          </MiddleContainer>
          <Output id="output" />
        </GlobalContainer>
      </Context>
    </>
  );
};

export default Envoirment;

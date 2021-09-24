import { useState, useEffect, FC, MouseEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { useAppContext } from '../../context';

import SidebarSection from './Sidebar';
import { Panel, PanelItem } from './Panel';
import { Files, FileItem, TopBar, TopBarButton, DeleteButton } from './Files';
import AddLanguageLogo from '../../utils/AddLanguageLogo';
import axios from 'axios';
import { AUTH_TOKEN } from '../../helper'
import CustomPostRetriever from '../projectgetter/CustomPostRetriever';
import Outlogger from '../login/logout';

// import {projectTitle} from '../environment'

interface Props {
  projectTitle: string;
  id: string;
}

let title
let projectTitle

const Sidebar: FC<Props> = (props) => {

  let savedTitle = projectTitle

  const [titleOfProject, setTitleOfProject] = useState(title);
  const {
    filesData,
    filesList,
    activeFile,
    changeActiveFile,
    addFile,
    // addImportedFilesData,
    removeFile,
  } = useAppContext();

  if(savedTitle){
    title = savedTitle;
    console.log("executed 'actual title'")
  }
  else if(titleOfProject == null){
    title = "(Geen title)"
    console.log("executed 'geen title'")
  }

  const isAcceptedFileFormat = (filename: string) =>
    filename.endsWith('html') || filename.endsWith('css') || filename.endsWith('js');

  const addNewFile = () => {
    const filename = window.prompt('Please enter file name');

    if (filename !== '' && filename !== null && isAcceptedFileFormat(filename)) {
      const isFilePresent = filesList.filter((name) => name === filename).length;
      let extension = filename.toLowerCase().split('.').pop() as string;
      // Because js === javascript in Monaco
      extension = extension === 'js' ? 'javascript' : extension;

      if (isFilePresent) {
        toast.error('File name cannot be same');
        return;
      }

      addFile({
        name: filename,
        language: extension,
        value: '',
      });
    } else if (filename) {
      toast.error('File format not supported! Only .html, .css, .js');
    }
  };

  const deleteFile = (ev: MouseEvent, filename: string) => {
    ev.stopPropagation();
    const doDelete = window.confirm('Are you sure you want to delete this file?');

    if (doDelete) {
      removeFile(filename);
    }
  };

  const saveWork = (ev: MouseEvent) => {

    const handleChange = async (event) => { 
      title = event.target.value
    }

    const HandleSubmit = (event) => {
      event.preventDefault();
      toast.dismiss();

      let url = "https://ota.toekomst.school/wp-json/wp/v2/codeprojects/"

      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
        mode: "no-cors"
      }
    
      const bodyParameters = {
          title: title,
          fields: {
            json: JSON.stringify({ filesData })
          },
          status: "publish"
      }

      //disable to prevent sending new posts
      if (title !== undefined || title !== null){
          // axios.post(
          //   url,
          //   bodyParameters,
          //   config
          // ).then(data => {
          //   let json = data.data.split("\n")
          //   console.log(json)
          // }).catch(console.log).catch(err => console.log(err));
      }
    }

    const user = JSON.parse(localStorage.getItem(AUTH_TOKEN) as string);

    switch(title){
      case "(Geen title)":
        toast.dark(
          <div>
            <form onSubmit = {HandleSubmit}>
              <fieldset>
                <label>
                  <p>Project name</p>
                  <input name="nameOfProject" onInput={handleChange}/>
                </label><br/>
                <button type="submit" onClick={() => setTitleOfProject(title)}>Submit</button>
              </fieldset>
            </form>
          </div>,
        );
      break;

      default:
          toast.dark(
            <div>Your project was saved.</div>
          )
    }
  }

  //300000 ms = 5 min

  // const MINUTE_MS = 10000;

  // useEffect(() => {
  // const interval = setInterval(() => {
  //   toast.dark('Het project is automatisch opgeslagen', {
  //     position: "bottom-left",
  //     autoClose: 2500,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     });
  // }, MINUTE_MS);
  // // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // return () => clearInterval(interval); 
  // }, [])

  // eslint-disable-next-line
  const getTitle = () => title

  const [fileList, setFileList] = useState('files');

  const refresh = (state) => {
    if (state === "files"){
      setFileList('files')
    }
    if (state === "projects"){
      setFileList('projects')
    }
    if (state === "profile"){
      setFileList('profile')
    }
  }

  return (
    
    <SidebarSection id={props.id}>
      <ToastContainer
        position="bottom-left"
        closeOnClick={false}
        autoClose={false}
        draggable={false}
      />
      <Panel>

        <PanelItem title="Profile" active={fileList === 'profile'} onClick={() => refresh('profile')}>
          
        <svg width="24" height="24" viewBox="0 0 24 24" style={{ pointerEvents: 'none' }}>
            <path d="M13 6c3.469 0 2 5 2 5s5-1.594 5 2v9h-12v-16h5zm.827-2h-7.827v20h16v-11.842c0-2.392-5.011-8.158-8.173-8.158zm.173-2l-3-2h-9v22h2v-20h10z" />
        </svg>

        </PanelItem>

        <PanelItem title="Explorer" active={fileList === 'files'} onClick={ () => {refresh('files');}}>
          <svg width="24" height="24" viewBox="0 0 24 24" style={{ pointerEvents: 'none' }}>
            <path d="M13 6c3.469 0 2 5 2 5s5-1.594 5 2v9h-12v-16h5zm.827-2h-7.827v20h16v-11.842c0-2.392-5.011-8.158-8.173-8.158zm.173-2l-3-2h-9v22h2v-20h10z" />
          </svg>
        </PanelItem>

        <PanelItem title="Save data remotely" onClick={saveWork}>
          <svg width="24" height="24" viewBox="0 0 24 24" style={{ pointerEvents: 'none' }}>
            <path d="M13 3h2.996v5h-2.996v-5zm11 1v20h-24v-24h20l4 4zm-17 5h10v-7h-10v7zm15-4.171l-2.828-2.829h-.172v9h-14v-9h-3v20h20v-17.171z" />
          </svg>
        </PanelItem>

        <PanelItem title="Change projects" active={fileList === 'projects'} onClick={() => refresh('projects')}>
          <svg
            width="24"
            height="24"
            fillRule="evenodd"
            clipRule="evenodd"
            style={{ pointerEvents: 'none' }}
          >
            <path d="M8 11h-6v10h20v-10h-6v-2h8v14h-24v-14h8v2zm5 2h4l-5 6-5-6h4v-12h2v12z" />
          </svg>
        </PanelItem>
      </Panel>

      <Files>
        <TopBar>
        {titleOfProject}
        {!!!titleOfProject &&
          <p>{titleOfProject}</p>
        }
        </TopBar>

        {fileList === 'profile' &&
          <TopBar>
          Profile
          </TopBar>
        }

        {fileList === 'profile' &&
          <FileItem>
              <Outlogger/>
            </FileItem>
        }

        {fileList === 'files' && 
        <TopBar>
          Files
          <TopBarButton title="Add new file" onClick={addNewFile}>
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M23 17h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2zm-7 5v2h-15v-24h10.189c3.163 0 9.811 7.223 9.811 9.614v2.386h-2v-1.543c0-4.107-6-2.457-6-2.457s1.518-6-2.638-6h-7.362v20h13z" />
            </svg>
          </TopBarButton>
        </TopBar>}
        
        {fileList === 'files' && filesData.map((file) => (
          <FileItem
          active={file.name === activeFile.name}
          key={file.name}
          onClick={() => changeActiveFile(file)}
        >
          <div>
            <AddLanguageLogo fileName={file.name} />
          </div>
          <DeleteButton title="Delete file" onClick={(ev) => deleteFile(ev, file.name)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#f5f5f5">
              <path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
            </svg>
          </DeleteButton>
        </FileItem>
        ))}
        
        {fileList === 'projects' &&
        <TopBar>
          Projects
          <TopBarButton title="Add new file"/>
        </TopBar>
        }
        
        {fileList === 'projects' && 
        <FileItem>
          <CustomPostRetriever/>
        </FileItem>
        }
      
      </Files>
    </SidebarSection>
  );
};

export default Sidebar;

// const getSavedWork = () => {
//     //const props.id = window.prompt('Please enter your saved data ID');
//     alert('The projectname was changed to: ' + getTitle())
//     if (props.id) {
//       fetch(`https://ota.toekomst.school/wp-json/wp/v2/codeprojects?id=${props.id}`)
//         .then((res) => res.json())
//         .then(({ filesData }) => {
//           if (filesData) {
//             localStorage.setItem('id', props.id);
//             localforage.setItem('filesData', filesData);
//             addImportedFilesData(filesData);

//             toast.dismiss();
//             toast.dark('Successfuly imported your saved data');
//             return;
//           }

//           toast.dismiss();
//           toast.error('Sorry! unable to import your data');
//         })
//         .catch(() => {
//           toast.dismiss();
//           toast.error('Sorry! unable to import your data');
//         });
//     }
//   };

// const saveWork = (ev: MouseEvent) => {
//   const elem = ev.target as HTMLButtonElement;
//   const id = localStorage.getItem('id');
//   const headers = {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   };
//   const errorFn = () => {
//     elem.disabled = false;
//     elem.style.cursor = 'pointer';
//     toast.dismiss();
//     toast.error(`Sorry! unable to save your data`);
//   };

//   // Disable button
//   elem.disabled = true;
//   elem.style.cursor = 'progress';

//   if (id) {
//     fetch(`/api/saveFilesData?id=${id}`, {
//       method: 'POST',
//       headers,
//       body: JSON.stringify({ filesData }),
//     })
//       .then((res) => res.json())
//       .then(({ id }) => {
//         toast.dismiss();
//         toast.dark(
//           <div>
//             Successfuly updated your saved data.
//             <br />
//             You can also import your saved data from anywhere by entering <UserId>{id}</UserId> in
//             the import option.
//           </div>,
//         );

//         elem.disabled = false;
//         elem.style.cursor = 'pointer';
//       })
//       .catch(errorFn);
//     return false;
//   }

//   fetch('/api/saveFilesData', {
//     method: 'POST',
//     headers,
//     body: JSON.stringify({ filesData }),
//   })
//     .then((res) => res.json())
//     .then(({ id }) => {
//       localStorage.setItem('id', id);
//       toast.dismiss();
//       toast.dark(
//         <div>
//           Successfuly saved your data.
//           <br />
//           You can also import your saved data from anywhere by entering <UserId>{id}</UserId> in
//           the import option.
//         </div>,
//       );

//       elem.disabled = false;
//       elem.style.cursor = 'pointer';
//     })
//     .catch(errorFn);
// };
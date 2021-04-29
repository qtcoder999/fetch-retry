import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { placeRequest } from "./utils/utils";
import '@material/react-snackbar/dist/snackbar.css';
import { Snackbar } from '@material/react-snackbar';

function App() {
  // let API = 'https://jsonplaceholder.typicode.com/posts';
  let API = 'http://localhost:8081/';
  let [data, setData] = useState(null);
  let [error, setError] = useState(false);

  useEffect(() => {

    const fetchData = async () => {

      try {
        const response = await placeRequest(API, 3);
        setData(response)

      } catch (error) {

        setError(error);

      }

    }

    fetchData();

  }, [API]);

  // console.log("Data", data);

  const showData = () => {
    if (typeof data != undefined && data) {
      return data.map((element, index) => (<div key={index}>{`${element.id}. ${element.title}`}</div>)
      )
    }
    else {
      return (<div>No response received!</div>)
    }
  }

  return (
    <>
      {showData()}
      {error &&
        <Snackbar message={JSON.stringify(error)} />
      }
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


/*

cd /home/paras/Desktop/paras-projects-react/react-virtual/examples/smooth-scroll/ ; npm start

cd /home/paras/Desktop/node-web-scraper/ ; nodemon server.js


cd /home/paras/Desktop/paras-projects-react/react-virtual/examples/smooth-scroll/ ; npm start | (cd /home/paras/Desktop/node-web-scraper/ ; nodemon server.js)

*/


// const promise = new Promise((resolve, reject) => {
//   setTimeout(function () {
//     try {
//       setTimeout(function () {
//         try {
//           alert();
//           throw new Error('error!');
//         } catch (e) {
//           reject(e)
//         }
//       }, 300)
//     } catch (e) {

//       reject(e)
//     }
//   }, 300)
// })

// promise
//   .then(result => console.log("Ok " + result))
//   .catch(error => console.error("Ouch " + error))
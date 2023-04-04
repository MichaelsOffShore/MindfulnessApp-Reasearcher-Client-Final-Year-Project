import React from "react";
import "./styling/App.css";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useState } from "react";
import logo from './Images/logo.jpg';

function App() {
  // establish connection to database

  // start of token is random so cant manipulate
  // generate bulk tokens e.g 10 anjd store in databvase
  // export all tokens as comma seperatewd value file (csv file)

  const [kentucky, setKentuckyChecked] = useState(false);
  const [toronto, setTorontoChecked] = useState(false);
  const [maas, setMAASChecked] = useState(false);
  const [langer, setLangerChecked] = useState(false);
  const [phil, setPhilChecked] = useState(false);
  const [statemindful, setStateMindful] = useState(false);
  const [task, setTaskChecked] = useState(false);


function exportTokens(){

const fileUrl = 'http://localhost:8000/downloadFile';
const fileName = 'tokens.csv';
fetch(fileUrl)
  .then(response => response.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  })
  .catch(error => {
    console.error(`Error downloading file: ${error.message}`);
    window.alert("There has been an error retriving the tokens, please try again later...");
  });


}


  const handleChange = (event) => {
    let elementID = event.target.name;
    // invert the boolean
    switch(elementID){

      case "kentucky":
        setKentuckyChecked(event.target.checked);
      break;
      case "toronto":
        setTorontoChecked(event.target.checked);
      break;
      case "maas":
        setMAASChecked(event.target.checked);
      break;
      case "langer":
        setLangerChecked(event.target.checked);
      break;
      case "phil":
        setPhilChecked(event.target.checked);
      break;
      case "statemindful":
        setStateMindful(event.target.checked);
      break;
      case "task":
        setTaskChecked(event.target.checked);
      break;
      default:
      break;

    }

  }




  function generateTokens() {
    // kentucky inventory = "KI"
    // toronto mindfulness = "TO"
    // MAAS = "MA"
    // Langer mindfulness test = "LA"
    // Philadelphia mindfulness test = "PH"
    // build test keys
    // eg"KIMA"
    let tKeys = "";
    if(kentucky){
      tKeys += "KI";
    }
    if(toronto){
      tKeys += "TO";
    }
    if(maas){
      tKeys += "MA";
    }
    if(langer){
      tKeys += "LA";
    }
    if(phil){
      tKeys += "PH";
    }
    if(statemindful){
      tKeys += "SM";
    }
    if(task){
      tKeys += "TA";
    }
    /*
    if(kentucky){
      console.log("Kentucky is true");
      tKeys += "KI";
    }
    */
    
    let tokenData = {
      "testKeys": tKeys,
      "numOfTokens": (document.getElementById("quantity").value),
      "link": (document.getElementById("taskLink").value)
    };
    // check if numoftookens is 1 or more
    if(tokenData["numOfTokens"] <= 0 || tokenData["numOfTokens"] > 20){
      alert("Number of tokens must be between 1 and 20!")
      return;
    }
    if(tokenData["testKeys"] === ""){
      window.alert("Please select one or more mindfulness tests")
      return;
    }else if(tokenData["testKeys"].includes("TA") && (document.getElementById("taskLink").value) === ""){
      window.alert("Please enter a link for the mindfulness task");
      return;
    }else if(!tokenData["testKeys"].includes("TA")){
      tokenData["link"] = "";
    }
    axios
      .post("http://localhost:8000/generateToken", tokenData)
      .then(function (response) {
        console.log("Data: " + response.data);
        alert("Token Generation Successful!")
      })
      .catch(function (error) {
        console.log(error);
        alert("There has been an error generating the token(s), please try again later")
      });
  }
  return (
    <div className="App" style={{backgroundColor: ""}}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Token Generator</title>
      </Helmet>

      <h1 className="header">Token Generator</h1>
        <br />
        <br />
       
       
      <img id="logo" src={logo} alt="mindfulness logo"></img>


      <div className="container">
        <input type="checkbox" id="t1" name="kentucky" unchecked onChange={handleChange}></input>
        <label for="scales">Kentucky Inventory</label>
        <br />
        <br />
        <input type="checkbox" id="t2" name="toronto" unchecked onChange={handleChange}></input>
        <label for="scales">Toronto Mindfulness Test</label>
        <br />
        <br />
        <input type="checkbox" id="t3" name="maas" unchecked onChange={handleChange}></input>
        <label for="scales">MAAS</label>
        <br />
        <br />
        <input type="checkbox" id="t4" name="langer" unchecked onChange={handleChange}></input>
        <label for="scales">Langer Mindfulness Test</label>
        <br />
        <br />
        <input type="checkbox" id="t5" name="phil" unchecked onChange={handleChange}></input>
        <label for="scales">Philadelphia Mindfulness Test</label>
        <br />
        <br />
        <input type="checkbox" id="t6" name="statemindful" unchecked onChange={handleChange}></input>
        <label for="scales">State Mindfulness</label>
        <br />
        <br />
        <input type="checkbox" id="t7" name="task" unchecked onChange={handleChange}></input>
        <label for="scales">Tasks</label>
        <br />
        <br />

        <hr />

        <label>
            Quantity:&nbsp;&nbsp;
            <input type="text" name="quantity" id="quantity" defaultValue="1"/>
        </label>
        <br />
        <br />
        <label>
            Task Link:&nbsp;&nbsp;
            <input type="text" name="taskLink" id="taskLink" defaultValue=""/>
        </label>


        
        <br />
        <br />
        <button id="generateButton" onClick={generateTokens}>Generate</button>
      </div>
      <br />
      
      <button id="exportButton" onClick={exportTokens}>Export Tokens</button>
    
    
    </div>
  );
}

export default App;

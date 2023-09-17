import React from "react";
import CostsForm from "./components/costs-form";
import Report from "./components/report";


//to deploy to github pages paste the following command:
//npm run deploy -- -m "Deploy React app to GitHub Pages"

function App() {
  return (

    <div>
      <h1>Costs Manager App</h1>
      <CostsForm />
      <Report />
    </div>
  );
}

export default App;

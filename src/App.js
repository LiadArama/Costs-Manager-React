import React from "react";
import CostForm from "./components/CostForm";
import Report from "./components/Report";


//to deploy to github pages paste the following command:
//npm run deploy -- -m "Deploy React app to GitHub Pages"

function App() {
  return (

    <div>
      <h1>Costs Manager App</h1>
      <CostForm />
      <Report />
    </div>
  );
}

export default App;

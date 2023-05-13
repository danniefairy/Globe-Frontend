import React from "react";
import Globe from "./Globe";

function App() {
  return (
    <div>      
      {/*https://www.youtube.com/watch?v=vM8M4QloVL0*/}
      <div className="flex h-screen">
        <div className="w-2/3" id="canvasContainer">
          <Globe />
        </div>
        <div className="w-1/3" id="imageContainer">
          <h1></h1>
        </div>
      </div>
    </div>
  );
}

export default App;
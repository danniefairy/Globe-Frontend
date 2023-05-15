import React from "react";
import Globe from "./Globe";

function App() {
  return (
    <div>
      {/*https://www.youtube.com/watch?v=vM8M4QloVL0*/}
      <div className="flex flex-col md:flex-row h-screen">
        <div className="md:w-2/3 flex-shrink-0" id="canvasContainer">
          <Globe />
        </div>
        <div className="md:w-1/3 flex-shrink-0" id="imageContainer">
          <h1></h1>
        </div>
      </div>
    </div>
  );
}

export default App;
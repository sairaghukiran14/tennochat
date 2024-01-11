import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Chatspage from "./Components/Chatspage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/chats" element={<Chatspage />} />
      </Routes>
    </div>
  );
}

export default App;

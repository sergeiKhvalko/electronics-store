import './App.css';
import { Routes, Route, Link } from "react-router-dom";

import Home from './Pages/Home';

const App = () => {
  return (
    <div className="App">
		 <Routes>
		 <Route path="/" element={<Home />} />
        {/* <Route path="about" element={<About />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
		 </Routes>
    </div>
  );
}

export default App;

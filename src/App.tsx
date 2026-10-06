import { Routes, Route } from "react-router-dom";

import BaseLayout from "./layouts/BaseLayout";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes> 
  );
}

export default App;
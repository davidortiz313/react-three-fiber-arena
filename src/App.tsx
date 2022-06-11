import React from "react";
import { Route, BrowserRouter, Routes, Link } from "react-router-dom";
import Grid from "./components/grid";
import PackAnim from "./components/pack-anim";
import Rotating from "./components/rotating";
const App: React.FC = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          path="/"
          element={
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2rem",
                background: "black",
              }}
            >
              <ul>
                <li>
                  <Link to="/pack">Pack Animation</Link>
                </li>
                <li>
                  <Link to="/rotating">Rotating Animation</Link>
                </li>
                <li>
                  <Link to="/grid">Drawing Grids</Link>
                </li>
              </ul>
            </div>
          }
        />
        <Route path="/pack" element={<PackAnim />} />
        <Route path="/rotating" element={<Rotating />} />
        <Route path="/grid" element={<Grid />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

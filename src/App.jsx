import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Diary from "./pages/Diary";
import Photo from "./pages/Photo";
import Comment from "./pages/Comment";
import Profile from "./components/Profile";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Today from "./components/Today";
import Title from "./components/Title";

function App() {

  const [isMobile, setIsMobile] = useState(false);
  const [isNavTop, setIsNavTop] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth <= 768){
        setIsMobile(true);
      }
      if(window.innerWidth <= 540){
        setIsNavTop(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="container">
            {isNavTop ?
                  <Nav /> : null }
        <div className="dashed-line">
          <div className="wrap">
            <div className="inner">

              <div className="home-left">
                <div className="home-left-inner mg20">
                  <Today />
                  <div className="home-left-body">
                  {isMobile && !isNavTop ?
                   <Nav /> : null }
                    <Profile />
                  </div>
                </div>
              </div>
              {/* home-left */}

              <div className="home-right">
                <div className="home-right-inner mg20">
                {isMobile ?
                  null : <Title /> }

                  <div className="home-right-body">
                  {isMobile ?
                  null : <Nav /> }
                    

                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/diary" element={<Diary />} />
                      <Route path="/photo" element={<Photo />} />
                      <Route path="/comment" element={<Comment />} />
                    </Routes>
                  </div>
                </div>
              </div>
              {/* home-right */}
              
            </div>
            {/* inner */}
          </div>
          {/* wrap */}
        </div>
        {/* dashed-line */}
      </div>
      {/* container */}
    </>
  );
}

export default App;

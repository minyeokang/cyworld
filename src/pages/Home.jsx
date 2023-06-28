import { useEffect, useState } from "react";
import Canvas from "../components/Canvas";
import News from "../components/News";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 540) {
        setIsMobile(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);

  return (
    <>
      {isMobile ? null : ( <News /> )}
      <Canvas />
    </>
  );
};

export default Home;

import { useState } from "react";
import moon from "../img/night.png";
import sun from "../img/sun.png";
import Todo from "./Todo";

const Home = () => {
  const [light, setLight] = useState(true);
  return (
    <div className="h-screen w-full relative md:overflow-hidden">
      {/* Peachy Mint Dream Gradient */}
      {light ? (
        <div className="h-screen max-md:h-190 w-full bg-white relative text-gray-800 ">
          {/* Zigzag Lightning - Light Pattern */}
          <div
            className="absolute inset-0 z-0 pointer-events-none duration-1000"
            style={{
              backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(75, 85, 99, 0.08) 20px, rgba(75, 85, 99, 0.08) 21px),
        repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(107, 114, 128, 0.06) 30px, rgba(107, 114, 128, 0.06) 31px),
        repeating-linear-gradient(60deg, transparent, transparent 40px, rgba(55, 65, 81, 0.05) 40px, rgba(55, 65, 81, 0.05) 41px),
        repeating-linear-gradient(150deg, transparent, transparent 35px, rgba(31, 41, 55, 0.04) 35px, rgba(31, 41, 55, 0.04) 36px)
      `,
            }}
          />
        </div>
      ) : (
        <div className="h-screen max-md:h-190 w-full relative ">
          {/* Dark Dot Matrix */}
          <div
            className="absolute inset-0 z-0 duration-1000"
            style={{
              backgroundColor: "#0a0a0a",
              backgroundImage: `
       radial-gradient(circle at 25% 25%, #222222 0.5px, transparent 1px),
       radial-gradient(circle at 75% 75%, #111111 0.5px, transparent 1px)
     `,
              backgroundSize: "10px 10px",
              imageRendering: "pixelated",
            }}
          />
        </div>
      )}
      <div
        onClick={() => setLight(!light)}
        className="absolute z-30 w-12 h-12 top-5 right-5 p-1 cursor-pointer"
      >
        {light ? (
          <img src={sun} className="animate-sun" />
        ) : (
          <img src={moon} className="scale-70 animate-moon" />
        )}
      </div>
      <Todo light={light} />
    </div>
  );
};
export default Home;

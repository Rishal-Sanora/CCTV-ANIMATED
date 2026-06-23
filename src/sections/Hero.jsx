import CameraScene from "../components/CameraScene";
import InfoPanel from "../components/InfoPanel";
import { useState } from "react";
import "../styles/Hero.css";
function Hero() {
  const [selectedPart, setSelectedPart] = useState(null);
  return (
    <section className="hero">

      <div className="title">

        <h1>CCTV CAMERA</h1>

        <p>
          Interactive 3D Product Experience
        </p>

      </div>

      <div className="canvas-container">

        <CameraScene />

      </div>
      <InfoPanel

part={selectedPart}

onClose={()=>setSelectedPart(null)}

/>

    </section>
  );
}

export default Hero;
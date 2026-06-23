import { motion } from "framer-motion";
import "../styles/InfoPanel.css";

function InfoPanel({ part, onClose }) {

  if (!part) return null;

  return (

    <motion.div

      className="info-panel"

      initial={{ x: 500 }}

      animate={{ x: 0 }}

      exit={{ x: 500 }}

    >

      <button
        className="close-btn"
        onClick={onClose}
      >
        ×
      </button>

      <h1>{part.name}</h1>

      <h2>Function</h2>

      <p>{part.description}</p>

      <h2>Specifications</h2>

      <ul>

        <li>{part.spec1}</li>

        <li>{part.spec2}</li>

      </ul>

      <h2>Applications</h2>

      <ul>

        <li>{part.app1}</li>

        <li>{part.app2}</li>

      </ul>

    </motion.div>

  );
}

export default InfoPanel;
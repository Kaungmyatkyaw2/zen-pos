import "./styles.css";
import { HTMLProps, useState } from "react";
import { motion } from "framer-motion";

export default function ImageLazy({ ...rest }: HTMLProps<HTMLImageElement>) {
  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);

  const imageLoaded = () => {
    setImageLoading(false);
    setPulsing(false);
    setTimeout(() => setPulsing(false), 600);
  };

  return (
    <div className={`${pulsing ? "pulse" : ""} loadable ${rest.className}`}>
      <motion.img
        initial={{opacity: 0 }}
        animate={{
          opacity: imageLoading ? 0 : 1,
        }}
        transition={{ opacity: { delay: 0.5, duration: 0.4 } }}
        onLoad={imageLoaded}
        width="100%"
        className={'w-full h-full object-cover'}
        src={rest.src}
      />
    </div>
  );
}

'use client';

import { motion } from "framer-motion";
import Image from "next/image";

const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-purple-600/20 to-blue-600/20 bg-opacity-75 z-40">
      <motion.div 
        className="relative w-24 h-24 flex items-center justify-center"
        animate={{
          rotate: [0, -15, 15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "easeInOut"
        }}
      >

        <Image
          src="https://res.cloudinary.com/donshmlbl/image/upload/v1741962506/vault_offlogo_yvepfj.jpg"
          alt="Loading"
          width={32}
          height={32}
          className="z-10"
        />
        
        <div className="absolute w-14 h-14 border-4 border-purple-600/80 border-t-transparent border-b-transparent rounded-full animate-spin" />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;

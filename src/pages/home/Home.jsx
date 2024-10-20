import { Canvas } from "@react-three/fiber";
import Controls from "./controls/Controls";
import Lights from "./lights/Lights";
import { Physics } from "@react-three/rapier";
import Beach from "./world/Beach";
import Staging from "./staging/Staging";
import { Html, Loader, PositionalAudio } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Video from "./world/Video";

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  // const buttonRef = useRef(null);
  const cameraSettings = {
    position: [0, 15, 15],
  };

  const audioRef = useRef(null);

  const handlePlaybutton = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    setIsPlaying(true);
    audioRef.current?.setVolume(10);
  }, [audioRef]);
  return (
    <>
      <Canvas camera={cameraSettings}>
        <Suspense fallback={null}>
          <Perf position={"bottom-left"} />
          <Controls />
          <Lights />
          <Staging />
          <Physics debug={false}>
            <Beach />
          </Physics>
          <Video name="screen" position-y={10} scale={8} />
          <group position={[0, 5, 0]}>
            {!isPlaying && (
              <PositionalAudio
                autoplay
                loop
                ref={audioRef}
                url="/sounds/waves.mp3"
                distance={3}
              />
            )}
          </group>
          <Html position={[0, 5, 0]} scaleFactor={0.1}>
            <button onClick={() => handlePlaybutton()}>
              {isPlaying === false ? "Pause" : "Play"}
            </button>
          </Html>
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
};

export default Home;

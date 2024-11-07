"use client";
import React, { useRef, useState } from "react";
import styles from "./VideoPlayer.module.css"; // Make sure to import the CSS module
import Image from "next/image";
import { _IMG } from "@/constants/images";

interface VideoPlayerProps {
  video_name: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video_name }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    setHasStarted(true);
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play();
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.pause();
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className={`${styles.videoContainer}`}>
      <video controls ref={videoRef} onEnded={handleVideoEnd}>
        <source src={`/assets/video/${video_name}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className={`${styles.controls} ${
          hasStarted ? styles.hiddenControls : ""
        }`}
      >
        <button
          className={styles.plyBtn}
          onClick={isPlaying ? handlePause : handlePlay}
        >
          {isPlaying ? (
            <Image
layout="intrinsic" src={_IMG.pauseVideoBtn} alt="Pause Button" loading="lazy" />
          ) : (
            <Image
layout="intrinsic" src={_IMG.playBtn} alt="Play Button" loading="lazy" />
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;

"use client";

import useFullScreen from "@/hooks/useFullScreen";
import useInterval from "@/hooks/useInterval";
import { cn } from "@/libs/utils";
import { useEffect, useRef, useState } from "react";

export default function PromotionVideo({ isEng }: { isEng: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef(null);
  const [full, setFull] = useFullScreen(videoRef);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isHover, setIsHover] = useState(false);

  function controlVideo() {
    if (videoRef.current === null) return;
    if (playing) {
      setIsHover(true);
      videoRef.current.pause();
      setPlaying(false);
    } else {
      setIsHover(false);
      videoRef.current.play();
      setPlaying(true);
      setVideoTime(videoRef.current.duration);
    }
  }

  function backSkip() {
    if (videoRef.current === null) return;
    videoRef.current.currentTime -= 5;
  }

  function skip() {
    if (videoRef.current === null) return;
    videoRef.current.currentTime += 5;
  }

  function handleVolume() {
    if (videoRef.current === null) return;
    if (isMuted) {
      videoRef.current.muted = true;
      setIsMuted(false);
    } else {
      videoRef.current.muted = false;
      setIsMuted(true);
    }
  }

  useEffect(() => {
    videoRef.current?.currentTime !== currentTime
      ? setPlaying(true)
      : setPlaying(false);
    videoRef.current?.muted ? setIsMuted(false) : setIsMuted(true);
  }, [full]);

  useInterval(() => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setProgress((videoRef.current?.currentTime / videoTime) * 100);
  }, 1000);

  return (
    <section className="h-[60vw] lg:h-[85vh] bg-[#3c3736] flex items-center justify-center flex-col w-screen overflow-hidden">
      <div
        className="relative h-full"
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <video
          className="py-[15px] md:py-[24px] xl:py-[60px] h-full"
          src={
            isEng ? "/videos/promotionClipEng.mp4" : "/videos/promotionClip.mp4"
          }
          id="grinergy-video"
          ref={videoRef}
          poster="/images/clipImg.png"
          onEnded={() => setPlaying(false)}
          playsInline={true}
        ></video>
        <div
          className={cn(
            "w-full absolute bottom-[19px] md:bottom-[30px] xl:bottom-[72px] flex items-end",
            !playing || isHover ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Play Control Section */}
          <div className="w-[30px] mx-[4px] md:w-[41px] md:mx-[6px] xl:w-[82px] xl:mx-[12px] aspect-[82/49] flex justify-center items-center rounded-[10%] bg-[#3c3736]">
            <img
              className={cn(
                "w-[9px] md:w-[12px] xl:w-[24px] aspect-[24/25] cursor-pointer",
                !playing && "translate-x-[10%]"
              )}
              src={playing ? "/images/pause.png" : "/images/play.png"}
              alt="control-button"
              onClick={() => controlVideo()}
            />
          </div>

          {/* Time Control Section */}
          <div className="h-[13.5365px] mr-[4px] md:h-[18.5px] md:mr-[6px] xl:h-[37px] xl:mr-[12px] w-full bg-[#3c3736] rounded-[5px] flex items-center">
            <img
              className="h-[7px] ml-[4px] md:h-[10px] md:ml-[6px] xl:h-[20px] xl:ml-[12px] cursor-pointer"
              onClick={backSkip}
              src="/images/back-skip.png"
              alt="back-skip"
            />
            <img
              className="h-[7px] ml-[4px] md:h-[10px] md:ml-[6px] xl:h-[20px] xl:ml-[12px] cursor-pointer"
              onClick={skip}
              src="/images/skip.png"
              alt="skip"
            />
            <div className="p-[4px] md:p-[6px] xl:p-[12px] h-full bg-[#3c3736] z-10 w-full">
              <div className="h-[5.5365px] md:h-[7.5px] xl:h-[13px] w-full relative border-[1pt] border-gray-400">
                <div
                  ref={progressRef}
                  style={{ width: `${progress}%` }}
                  className="h-full bg-[#2fabbf]"
                />
              </div>
            </div>
            {/* Volume Control */}
            <img
              className="h-[7px] mr-[4px] md:h-[10px] md:mr-[6px] xl:h-[20px] xl:mr-[12px] cursor-pointer"
              onClick={handleVolume}
              src={isMuted ? "/images/volume.png" : "/images/mute.png"}
              alt="volume-control"
            />
            {/* Full Screen Control */}
            <img
              className="h-[7px] mr-[4px] md:h-[10px] md:mr-[6px] xl:h-[20px] xl:mr-[12px] cursor-pointer"
              onClick={() => {
                setIsHover(false);
                setFull(!full);
              }}
              src="/images/full.png"
              alt="full-screen"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { Volume2 } from "lucide-react";

export function CompanyIntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);

  function enableSound() {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;
    void video.play();
    setSoundOn(true);
  }

  return (
    <>
      <div className="company-intro-video-frame">
        <video
          ref={videoRef}
          src="/dmdnp-assets/company-intro-video-20260902.mp4"
          aria-label="대명DnP 제작시설과 사인 제품 제작 현장 영상"
          autoPlay
          muted
          loop
          controls
          playsInline
          preload="auto"
        />
        {!soundOn ? (
          <button className="video-sound-button" type="button" onClick={enableSound} aria-label="회사소개 영상 소리 켜기">
            <Volume2 aria-hidden="true" />
            <span>소리 켜기</span>
          </button>
        ) : null}
      </div>
      <p className="video-sound-note">영상의 현장 음성을 들으시려면 화면 위의 <strong>소리 켜기</strong> 버튼을 눌러주세요.</p>
    </>
  );
}

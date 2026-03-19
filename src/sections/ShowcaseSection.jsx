import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  const rydeVideoRef = useRef(null);
  const libraryVideoRef = useRef(null);
  const ycDirectoryVideoRef = useRef(null);

  useEffect(() => {
  const videos = [
    rydeVideoRef.current,
    libraryVideoRef.current,
    ycDirectoryVideoRef.current,
  ];

  videos.forEach((video) => {
      if (video) {
        video.load();
      }
    });
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

const playVideo = (videoRef) => {
  const video = videoRef.current;
  if (!video) return;

  video.currentTime = 0;

  const playPromise = video.play();

  if (playPromise !== undefined) {
    playPromise.catch((error) => {
      if (error.name !== "AbortError") {
        console.log("Video play error:", error);
      }
    });
  }
};

const stopVideo = (videoRef) => {
  console.log("hover left");
  if (!videoRef.current) return;
  videoRef.current.pause();
  videoRef.current.currentTime = 0;
};

return (
  <div id="work" ref={sectionRef} className="app-showcase">
    <div className="w-full">
      <div className="showcaselayout">
        <div
          ref={rydeRef}
          className="first-project-wrapper showcase-video-card"
          onMouseEnter={() => playVideo(rydeVideoRef)}
          onMouseLeave={() => stopVideo(rydeVideoRef)}
        >
          <div className="image-wrapper">
            <video
              ref={rydeVideoRef}
              src="/videos/project1-web.mp4"
              poster="/images/project1.png"
              muted
              playsInline
              preload="auto"
              loop
              className="showcase-video"
            />
          </div>

          <div className="text-content">
            <h2>
              On-Demand Rides Made Simple with a Powerful, User-Friendly App
              called Ryde
            </h2>
            <p className="text-white-50 md:text-xl">
              An app built with React Native, Expo, & TailwindCSS for a fast,
              user-friendly experience.
            </p>
          </div>
        </div>

        <div className="project-list-wrapper overflow-hidden">
          <div
            className="project showcase-video-card"
            ref={libraryRef}
            onMouseEnter={() => playVideo(libraryVideoRef)}
            onMouseLeave={() => stopVideo(libraryVideoRef)}
          >
            <div className="image-wrapper relative overflow-hidden">
              <video
                ref={rydeVideoRef}
                src="/videos/project2-web.mp4"
                poster="/images/project2.png"
                muted
                playsInline
                preload="metadata"
                loop
                autoPlay={false}
                className="showcase-video absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <h2>The Library Management Platform</h2>
          </div>

          <div
            className="project showcase-video-card"
            ref={ycDirectoryRef}
            onMouseEnter={() => playVideo(ycDirectoryVideoRef)}
            onMouseLeave={() => stopVideo(ycDirectoryVideoRef)}
          >
            <div className="image-wrapper relative overflow-hidden">
              <video
                ref={ycDirectoryVideoRef}
                src="/videos/project3-web.mp4"
                poster="/images/project3.jpg"
                muted
                playsInline
                preload="metadata"
                loop
                autoP
                className="showcase-video absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <h2>A Luxury Watch Showcase Web</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}

export default AppShowcase;
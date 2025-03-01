const BackgroundVideo = ({ src }) => {
    return (
      <div className="relative z-20 flex justify-center items-center w-full h-full">
        <video
          className="w-full h-full"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={src} type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
      </div>
    );
};

export default BackgroundVideo;

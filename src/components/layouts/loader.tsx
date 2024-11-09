// import Lottie from "react-lottie";
// import animationData from "@/assets/animations/circle-animation.json"

const Loader = () => {
  //   const defaultOptions = {
  //     loop: true,
  //     autoplay: true,
  //     animationData: animationData,
  //     rendererSettings: {
  //       preserveAspectRatio: "xMidYMid slice"
  //     }
  //   };

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-[60vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Loader;

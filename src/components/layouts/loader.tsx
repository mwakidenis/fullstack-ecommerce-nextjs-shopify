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
    <div>
      <div className="w-full h-screen flex items-center justify-center">
        {/* <Lottie options={defaultOptions} width={300} height={300} /> */}
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loader;

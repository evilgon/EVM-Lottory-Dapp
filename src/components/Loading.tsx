import { RiseLoader } from "react-spinners";

interface Props{
    message:String
}
function Loading(props:Props) {
    const {message=''} = props
  return (
    <div className="min-h-screen min-w-full text-center flex flex-col justify-center items-center gap-4">
      <img
        src="https://fernando-xi.vercel.app/profile.jpeg"
        alt="profile image"
        className="rounded-full h-48 w-48 mx-auto"
      />
      <h1 className="text-2xl text-white font-bold mb-8">
        {message}
      </h1>
      <RiseLoader color="#194a41" />
    </div>
  );
}

export default Loading;

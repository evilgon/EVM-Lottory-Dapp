import { useMetamask } from "@thirdweb-dev/react";
import Button from "./Button";

function Login() {
  const connectWithMetamask = useMetamask();

  const handleConnectWithMetamask = () => connectWithMetamask();
  return (
    <div className="min-h-screen min-w-full text-center flex flex-col justify-center items-center gap-4">
      <img
        src="https://fernando-xi.vercel.app/profile.jpeg"
        alt=""
        className="rounded-full h-48 w-48 mx-auto"
      />
      <h1 className="text-6xl text-white font-bold">Fernando's Lottery DApp</h1>
      <h2 className="text-white text-2xl mb-8">Get started by logging with Metamask</h2>
      <Button
        text="Connect with Metamask"
        onClick={handleConnectWithMetamask}
      />
    </div>
  );
}

export default Login;

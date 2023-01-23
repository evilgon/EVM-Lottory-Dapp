import Marquee from "react-fast-marquee";
import { currency } from "../constants/currency";
import useReadContractData from "../hooks/useReadContractData";
import formatEthers from "../utils/formatEthers";

function MarqueeComponent() {
    const {lastWinner, lastWinnerAmount} = useReadContractData()
  return (
    <Marquee style={{ background: "transparent" }} gradient={false} speed={100}>
      <div className="flex space-x-2 mx-10">
        <h4 className="text-white font-semibold mx-5">Last winner: <span className="font-normal">{lastWinner}</span></h4>
        <h4 className="text-white font-semibold mx-5">Previous winnings: <span className="font-normal">{formatEthers(lastWinnerAmount)} {currency}</span></h4>
      </div>
    </Marquee>
  );
}

export default MarqueeComponent;

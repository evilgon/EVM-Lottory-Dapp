import React, { useEffect, useState } from "react";
import Header from "./Header";
import Loading from "./Loading";
import { ethers } from "ethers";
import { currency } from "../constants/currency";
import useReadContractData from "../hooks/useReadContractData";
import useWriteContractData from "../hooks/useWriteContractData";
import Counter from "./Counter";
import renderToast from "../utils/toast";
import formatEthers from "../utils/formatEthers";
import Marquee from "./Marquee";
import AdminControls from "./AdminControls";

interface Props {
  address: String;
}

function Dashboard(props: Props) {
  const { address } = props;
  const [quantity, setQuantity] = useState<number>(1);
  const [userTickets, setUserTickets] = useState([]);
  const {
    contract,
    isLoading,
    remainingTickets,
    currentWinningReward,
    ticketCommission,
    ticketPrice,
    expiration,
    tickets,
    winnings,
    lotteryOperator,
  } = useReadContractData(address);
  const { buyTickets, withdrawWinnings } = useWriteContractData(contract);

  const handleBuyTickets = async () => {
    if (!ticketPrice) return;
    const notification = renderToast({
      message: "Buying tickets...",
      type: "loading",
    });
    try {
      await buyTickets([
        {
          value: ethers.utils.parseEther(
            (
              Number(ethers.utils.formatEther(ticketPrice)) * quantity
            ).toString()
          ),
        },
      ]);
      renderToast({
        message: "tickets were purchased successfully",
        type: "success",
        notificationId: notification,
      });
    } catch (error) {
      renderToast({
        message: "There was an error",
        type: "error",
        notificationId: notification,
      });
      console.log("🍄 ~ handleBuyTickets ~ error", error);
    }
  };

  const handleWithdrawWinnings = async () => {
    const notification = renderToast({
      message: "Withdrawing winnings...",
      type: "loading",
    });
    try {
      await withdrawWinnings([{}]);
      renderToast({
        message: "tickets were withdrawn successfully",
        type: "success",
        notificationId: notification,
      });
    } catch (err) {
      renderToast({
        message: "There was an error",
        type: "error",
        notificationId: notification,
      });
    }
  };

  const handleDisabledBuyButton =
    expiration?.toString() < Date.now().toString() ||
    remainingTickets?.toNumber() === 0;

  const calculateTotal =
    ticketPrice && Number(formatEthers(ticketPrice)) * quantity;

  useEffect(() => {
    if (!tickets) return;
    const myTickets = tickets.filter((hash: string) => hash === address);
    setUserTickets(myTickets);
  }, [address, tickets]);

  if (isLoading)
    return <Loading message="Fernando's Lottery DApp is loading..." />;

  return (
    <div>
      <Header address={address || ""} />
      <Marquee />
      {lotteryOperator === address && (
        <div className="flex justify-center">
          <AdminControls />
        </div>
      )}
      {winnings > 0 && (
        <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5">
          <button
            onClick={handleWithdrawWinnings}
            className="p-5 bg-gradient-to-b from-orange-500 to-emerald-600 animate-pulse text-center rounded-xl w-full"
          >
            <p>Winner winner chicken dinner!</p>
            <p>
              Total winnings: {formatEthers(winnings)} {currency}
            </p>
            <br />
            <p className="font-semibold">Click here to withdraw!</p>
          </button>
        </div>
      )}
      <div className="space-y-5 max-w-5xl px-4 mx-auto md:space-y-0 p-5 items-start justify-center md:flex md:flex-row md:space-x-5">
        <div className="stats-container">
          <h1 className="text-5xl text-white font-semibold text-center">
            {" "}
            The Next Draw
          </h1>
          <div className="flex justify-between p-2 space-x-2">
            <div className="stats">
              <h2 className="text-sm">Total Pool</h2>
              <p className="text-xl">{`${formatEthers(
                currentWinningReward
              )} ${currency}`}</p>
            </div>
            <div className="stats">
              <h2 className="text-sm">Tickets Remaining</h2>
              <p className="text-xl">{remainingTickets?.toNumber()}</p>
            </div>
          </div>
          <div className="mt-5 mb-3">
            <Counter expiration={expiration} />
          </div>
        </div>

        <div className="stats-container space-x-2">
          <div className="stats-container">
            <div className="flex justify-between text-white items-center pb-2">
              <h2>Price per ticket</h2>
              <p>{`${formatEthers(ticketPrice)} ${currency}`}</p>
            </div>
            <div className="flex text-white items-center space-x-2 bg-[#091b18] border-[#004337] border p-4">
              <p>TICKETS</p>
              <input
                className="flex w-full bg-transparent text-right outline-none"
                type="number"
                min={1}
                max={10}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <div className="flex justify-between items-center font-bold mt-4 italic text-emerald-300">
              <p>Total cost of tickets</p>
              <p>{`${calculateTotal} ${currency}`}</p>
            </div>
            <div className="text-sm flex justify-between items-center italic text-emerald-200 mt-2">
              <p>Services fees</p>
              <p>{`${formatEthers(ticketCommission)} ${currency}`}</p>
            </div>
            <div className="text-sm flex justify-between items-center italic text-emerald-200 mt-2">
              <p>+ Network fees</p>
              <p>TBC</p>
            </div>
            <button
              disabled={handleDisabledBuyButton}
              onClick={handleBuyTickets}
              className="font-bold mt-5 w-full bg-gradient-to-br from-orange-500 to-emerald-600 py-5 rounded-md text-white shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy {quantity} tickets for{" "}
              {Number(formatEthers(ticketPrice)) * quantity} {currency}
            </button>
          </div>
          <br />
          {userTickets.length > 0 && (
            <div className="stats max-w-[100%]">
              <p>You have {userTickets.length} tickets in this draw</p>
              <div className="flex gap-4 justify-start flex-wrap mt-4">
                {userTickets.map((ticket, i) => (
                  <div className="stats flex-none w-9 min-w-[50px] bg-[#013f34]">
                    <p className="text-white my-4 text-center">{i + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

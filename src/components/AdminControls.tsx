import { currency } from "../constants/currency";
import useReadContractData from "../hooks/useReadContractData";
import useWriteContractData from "../hooks/useWriteContractData";
import Star from "../icons/Star";
import Refund from "../icons/Refund";
import Restart from "../icons/Restart";
import Coin from "../icons/Coin";
import formatEthers from "../utils/formatEthers";
import renderToast from "../utils/toast";

interface AdminActionArgs {
  action: ([]) => {};
  message: string;
}
function AdminControls() {
  const { contract, totalCommission } = useReadContractData();
  const { drawWinnerTicket, restartDraw, refundAll, withdrawCommission } =
    useWriteContractData(contract);

  const handleAdminAction = async ({ action, message }: AdminActionArgs) => {
    const notification = renderToast({
      message,
      type: "loading",
    });
    try {
      await action([{}]);
      renderToast({
        message: "Successful...",
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

  return (
    <div className="stats mx-2 max-w-[950px] px-4 text-center mt-4">
      <h2 className="font-semibold">Admin Controls</h2>
      <p>
        Total Commission to be withdrawn: {formatEthers(totalCommission)}{" "}
        {currency}
      </p>
      <div className="flex items-center justify-between gap-8 m-2 flex-col lg:flex-row mt-4">
        <button
          onClick={() =>
            handleAdminAction({
              action: drawWinnerTicket,
              message: "Getting draw winner ticket...",
            })
          }
          className="admin-button"
        >
          <Star />
          <p>Draw winner</p>
        </button>
        <button
          onClick={() =>
            handleAdminAction({
              action: withdrawCommission,
              message: "Withdrawing commission...",
            })
          }
          className="admin-button"
        >
          <Coin />
          <p>Withdraw commission</p>
        </button>
        <button
          onClick={() =>
            handleAdminAction({
              action: restartDraw,
              message: "Restarting draw...",
            })
          }
          className="admin-button"
        >
          <Restart />
          <p>Restart draw</p>
        </button>
        <button
          onClick={() =>
            handleAdminAction({ action: refundAll, message: "Refunding..." })
          }
          className="admin-button"
        >
          <Refund />
          <p>Refund all</p>
        </button>
      </div>
    </div>
  );
}

export default AdminControls;

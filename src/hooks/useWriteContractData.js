import { useContractWrite } from "@thirdweb-dev/react";

export default function useWriteContractData(contract){
      const { mutateAsync: buyTickets, isLoading } = useContractWrite(contract, "BuyTickets")
      const { mutateAsync: withdrawWinnings } = useContractWrite(contract, "WithdrawWinnings")
      const { mutateAsync: refundAll } = useContractWrite(contract, "RefundAll")
      const { mutateAsync: restartDraw } = useContractWrite(contract, "restartDraw")
      const { mutateAsync: withdrawCommission } = useContractWrite(contract, "WithdrawCommission")
      const { mutateAsync: drawWinnerTicket } = useContractWrite(contract, "DrawWinnerTicket")
      
      return {
        buyTickets,
        isLoading,
        withdrawWinnings,
        restartDraw,
        refundAll,
        drawWinnerTicket,
        withdrawCommission
      }
}
import { useContract, useContractRead } from "@thirdweb-dev/react";

export default function useReadContractData(address){
    const { contract, isLoading } = useContract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
      );
      const { data:remainingTickets } = useContractRead(contract, "RemainingTickets")
      const { data:currentWinningReward } = useContractRead(contract, "CurrentWinningReward")
      const { data:ticketPrice } = useContractRead(contract, "ticketPrice")
      const { data:ticketCommission } = useContractRead(contract, "ticketCommission")
      const { data:expiration } = useContractRead(contract, "expiration")
      const { data:tickets } = useContractRead(contract, "getTickets")
      const { data:winnings } = useContractRead(contract, "getWinningsForAddress", address)
      const { data: lastWinner } = useContractRead(contract, "lastWinner")
      const { data: lastWinnerAmount } = useContractRead(contract, "lastWinnerAmount")
      const { data: lotteryOperator } = useContractRead(contract, "lotteryOperator")
      const { data:totalCommission } = useContractRead(contract, "operatorTotalCommission")



      return {
        contract,
        isLoading,
        remainingTickets,
        currentWinningReward,
        ticketCommission,
        ticketPrice,
        expiration,
        tickets,
        winnings,
        lastWinner,
        lastWinnerAmount,
        lotteryOperator,
        totalCommission
      }
}
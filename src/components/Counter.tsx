import { RequiredParam, useContractMetadata } from "@thirdweb-dev/react"
import { ValidContractInstance } from "@thirdweb-dev/sdk"
import { BigNumber } from "ethers"
import Countdown from "react-countdown"

interface Renderer {
  hours: number
  minutes: number
  seconds: number
  completed: boolean
}

interface Props {
  expiration: BigNumber
} 

function Counter({expiration}: Props) {
    const renderer = ({hours=0,minutes=0,seconds=0,completed} : Renderer) => {
      if(completed){
        return <div>
          <h2 className="text-white text-xl text-center animate-bounce">Ticket sales have now closed for this draw</h2>
        </div>
      }
      return <div>
        <h3 className="text-white text-sm mb-2 italic">Time remaining</h3>
        <div className="flex space-x-6">
          <div className="flex-1">
            <p className="countdown">{hours}</p>
            <p className="countdown-label">hours</p>
          </div>
          <div className="flex-1">
            <p className="countdown">{minutes}</p>
            <p className="countdown-label">minutes</p>
          </div>
          <div className="flex-1">
            <p className="countdown">{seconds}</p>
            <p className="countdown-label">seconds</p>
          </div>
        </div>
      </div>
    }

  if(!expiration) return <></>
  
  return (
    <div>
        <Countdown date={new Date(expiration?.toNumber() * 1000)} renderer={renderer} />
    </div>
  )
}

export default Counter
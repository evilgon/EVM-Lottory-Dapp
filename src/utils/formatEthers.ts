import { BigNumber, ethers } from "ethers"

const formatEthers = (value:BigNumber) => {
    if(!value) return ""
    return ethers.utils.formatEther(value.toString())
}

export default formatEthers
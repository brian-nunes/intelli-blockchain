import useMetaMask from "@/contexts/MetaMaskProvider";
import { useEffect, useState } from "react";

const ConnectButton: React.FC = () => {
    const { isConnected, connect, provider, signer } = useMetaMask();
    const [address, setAddress] = useState<String>('')

    let fetchData = async () => {
        if(!signer) return

        let address_temp = await signer?.getAddress()
        console.log(address_temp)
        setAddress(address_temp ? address_temp : '')
    }

    useEffect(() => {
        fetchData()
      });

    if (!isConnected) {
        return (<button className='button' onClick={connect}>Conectar</button>)
    } else if (isConnected) {
        return (<>{address}</>)
    } else {
        return (<></>)
    }
}

export default ConnectButton;
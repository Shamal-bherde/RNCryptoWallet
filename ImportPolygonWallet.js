import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Web3 from "web3";
import { Buffer } from "buffer";

const ImportPolygonWallet = () => {
  const providerUrl = "https://rpc-mumbai.maticvigil.com/";
  const privateKey = `9e5c9d6e044075fe3c426092c011102acafbc01afd28cf7fe94cdf213ef23ef7`;

  const privateKeyBytes = Buffer.from(privateKey, "hex");

  const provider = new Web3.providers.HttpProvider(providerUrl);
  const web3 = new Web3(provider);

  const [address, setAddress] = useState(null);

  useEffect(() => {
    const fetchAccountAddress = async () => {
      try {
        const account = web3.eth.accounts.privateKeyToAccount(privateKeyBytes);
        setAddress(account.address);
        // setPolygonAddress('your polygon address');
      } catch (error) {
        console.error("Error fetching account address:", error);
      }
    };

    fetchAccountAddress();
  }, []);

  return (
    <View>
      <Text>Polygon Address {"\n"}</Text>

      <Text>Wallet address : {address}</Text>
    </View>
  );
};

export default ImportPolygonWallet;

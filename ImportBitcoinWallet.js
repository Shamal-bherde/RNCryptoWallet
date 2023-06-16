import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { networks } from "bitcoinjs-lib";
var bitcoin = require("bitcoinjs-lib");
import { Buffer } from "buffer";
import { ECPairFactory } from "ecpair";
const ecc = require("@bitcoinerlab/secp256k1");

const ImportBitcoinWallet = () => {
  const [add, setAdd] = useState();

  const handleSetAddress = async () => {
    const ECPair = ECPairFactory(ecc);
    const keyPair = ECPair.makeRandom({ network: networks.testnet });

    const { privateKey, publicKey } = keyPair;

    const pubkey = publicKey.toString("hex");

    const prikey = privateKey.toString("hex");

    console.log(pubkey, prikey);

    const { address } = bitcoin.payments.p2pkh({
      pubkey: publicKey,
      network: networks.testnet,
    });
    console.log(address);
    setAdd(address);
  };

  useEffect(() => {
    // Usage
    handleSetAddress();
  }, []);

  return (
    <View>
      <Text>Bitcoin Address : {add} </Text>
    </View>
  );
};

export default ImportBitcoinWallet;

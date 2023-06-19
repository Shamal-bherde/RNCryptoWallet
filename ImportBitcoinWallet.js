import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import walletStore from "./WalletStore";
import { observer } from "mobx-react-lite";

const ImportBitcoinWallet = observer(() => {
  const { bitcoinAddress, handleSetAddress } = walletStore;

  useEffect(() => {
    // Usage
    handleSetAddress();
  }, []);

  return (
    <View>
      <Text>Bitcoin Address : {bitcoinAddress} </Text>
    </View>
  );
});

export default ImportBitcoinWallet;

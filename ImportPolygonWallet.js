import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { observer } from "mobx-react-lite";
import walletStore from "./WalletStore";

const ImportPolygonWallet = observer(() => {
  const { privateKey, setPrivateKey, address, fetchAccountAddress } =
    walletStore;

  return (
    <View>
      <TextInput
        placeholder="Recipient Private Key"
        value={privateKey}
        onChangeText={setPrivateKey}
      />

      <Button onPress={fetchAccountAddress} title="Import Private Key" />
      <Text>
        {"\n"}Wallet address : {address}
      </Text>
    </View>
  );
});

export default ImportPolygonWallet;

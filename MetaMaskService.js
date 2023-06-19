import React from "react";
import { View, TextInput, Text, Button, TouchableOpacity } from "react-native";
import { observer } from "mobx-react-lite";
import walletStore from "./WalletStore";

const MetaMaskService = observer(() => {
  const {
    openURL,
    setRecipientAddress,
    recipientAddress,
    handleSendTransaction,
    amountToSend,
    setAmountToSend,
    transactionHash,
    status,
  } = walletStore;

  return (
    <View>
      <TextInput
        placeholder="Recipient Address"
        value={recipientAddress}
        onChangeText={setRecipientAddress}
      />

      <TextInput
        placeholder="Amount to send"
        value={amountToSend}
        onChangeText={setAmountToSend}
      />

      <Button onPress={handleSendTransaction} title="Send Transaction" />

      <TouchableOpacity onPress={openURL}>
        <Text>Click here - Block Explorer </Text>
      </TouchableOpacity>

      <Text>Transaction Hash :- {transactionHash}</Text>

      <Text>Transaction Status :- {status}</Text>
    </View>
  );
});

export default MetaMaskService;

import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
  Linking,
} from "react-native";
import axios from "axios";
import Web3 from "web3";
import { Buffer } from "buffer";

const MetaMaskService = () => {
  const [status, setStatus] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState("");

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.polygonscan.com/api?module=transaction&action=gettxinfo&txhash=${transactionHash}`
        );

        const transaction = response.data.result;

        if (transaction) {
          console.log(
            "Transaction status:",
            transaction.txreceipt_status === "1" ? "UnConfirmed" : "confirmed"
          );

          const status =
            transaction.txreceipt_status === "1" ? "UnConfirmed" : "Confirmed";

          setStatus(status);
        } else {
          console.log("Transaction not found.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (transactionHash) {
      fetchTransactionDetails();
    }
  }, [transactionHash]);

  const openURL = () => {
    const url = `https://mumbai.polygonscan.com/tx/${transactionHash}`;
    Linking.openURL(url);
  };

  const handleSendTransaction = async () => {
    const providerUrl = "https://rpc-mumbai.maticvigil.com/";

    const web3 = new Web3(providerUrl);

    const privateKey = `0461cfbf3189ad2805dadad3d6babb13ab55665c8afc408ce87dfd075735ce7b`;

    const privateKeyBytes = Buffer.from(privateKey, "hex");

    const account = web3.eth.accounts.privateKeyToAccount(privateKeyBytes);

    const a = web3.eth.accounts.wallet.add(account);

    const from = account.address;

    // Set the transaction options
    const options = {
      from: from,
      to: recipientAddress,
      value: web3.utils.toWei(amount, "ether"),
      gas: 21000,
    };

    console.log("options", options);

    // Send the transaction
    const result = await web3.eth.sendTransaction(options);
    console.log(result);
    setTransactionHash(result.transactionHash);
  };

  return (
    <View>
      <TextInput
        placeholder="Recipient Address"
        value={recipientAddress}
        onChangeText={setRecipientAddress}
      />

      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} />

      <Button onPress={handleSendTransaction} title="Send Transaction" />

      <TouchableOpacity onPress={openURL}>
        <Text>Click here - Block Explorer</Text>
      </TouchableOpacity>

      <Text>Transaction Status : {status}</Text>
    </View>
  );
};

export default MetaMaskService;

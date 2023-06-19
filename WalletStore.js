import { makeAutoObservable, action } from "mobx";
const { ethers } = require("ethers");
import "@ethersproject/shims";
import { Linking } from "react-native";
import { networks } from "bitcoinjs-lib";
var bitcoin = require("bitcoinjs-lib");
import { ECPairFactory } from "ecpair";
const ecc = require("@bitcoinerlab/secp256k1");

class WalletStore {
  privateKey = "";
  address = null;
  transactionHash = null;
  status = null;
  bitcoinAddress = null;

  constructor() {
    makeAutoObservable(this, {
      setPrivateKey: action.bound,
      setAddress: action.bound,
      fetchAccountAddress: action.bound,
      setTransactionHash: action.bound,
      handleSendTransaction: action.bound,
      fetchTransactionDetails: action.bound,
      openURL: action.bound,
      setRecipientAddress: action.bound,
      setAmountToSend: action.bound,
      setStatus: action.bound,
      setAdd: action.bound,
      handleSetAddress: action.bound,
    });
  }

  setPrivateKey(privateKey) {
    this.privateKey = privateKey;
  }

  setAddress(address) {
    this.address = address;
  }

  setRecipientAddress(recipientAddress) {
    this.recipientAddress = recipientAddress;
  }

  setAmountToSend(amountToSend) {
    this.amountToSend = amountToSend;
  }

  setTransactionHash(transactionHash) {
    this.transactionHash = transactionHash;
  }

  setStatus(status) {
    this.status = status;
  }

  setAdd(bitcoinAddress) {
    this.bitcoinAddress = bitcoinAddress;
  }

  fetchAccountAddress = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc-mumbai.maticvigil.com"
    );

    const wallet = new ethers.Wallet(this.privateKey, provider);
    this.setAddress(wallet.address);
  };

  openURL = () => {
    const url = `https://mumbai.polygonscan.com/tx/${this.transactionHash}`;
    Linking.openURL(url);
  };

  handleSendTransaction = action(async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc-mumbai.maticvigil.com"
    );

    const privateKey =
      "0461cfbf3189ad2805dadad3d6babb13ab55665c8afc408ce87dfd075735ce7b";

    const wallet = new ethers.Wallet(privateKey, provider);

    const amount = ethers.utils.parseUnits(this.amountToSend, "ether");

    const transactionResponse = await wallet.sendTransaction({
      to: this.recipientAddress,
      value: amount,
    });

    const receipt = await transactionResponse.wait();

    console.log(receipt.transactionHash, receipt.status);

    const txn = receipt.transactionHash;
    this.setTransactionHash(txn);

    console.log(this.transactionHash);
    if (receipt.status === 1) {
      this.setStatus("Success");
    } else {
      this.setStatus("Failed");
    }
  });

  handleSetAddress = async () => {
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
    this.setAdd(address);
  };
}
const walletStore = new WalletStore();
export default walletStore;

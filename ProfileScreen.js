import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";

const ProfileScreen = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState("");
  const [usdtPrice, setUsdtPrice] = useState("");

  useEffect(() => {
    // Fetch Bitcoin price
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      )
      .then((response) => {
        const { bitcoin } = response.data;
        setBitcoinPrice(bitcoin.usd);
      })
      .catch((error) => {
        console.error("Failed to fetch Bitcoin price:", error);
      });

    // Fetch USDT price on Polygon network
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd"
      )
      .then((response) => {
        const { tether } = response.data;
        setUsdtPrice(tether.usd);
      })
      .catch((error) => {
        console.error("Failed to fetch USDT price:", error);
      });
  }, []);

  return (
    <View>
      <Text>The live Price of Bitcoin and USDT</Text>

      <Text>Bitcoin Price: ${bitcoinPrice}</Text>
      <Text>USDT Price: ${usdtPrice}</Text>
    </View>
  );
};

export default ProfileScreen;

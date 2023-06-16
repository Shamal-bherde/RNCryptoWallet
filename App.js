import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import "./globals.js";
import ProfileScreen from "./ProfileScreen";
import ImportPolygonWallet from "./ImportPolygonWallet";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import MetaMaskService from "./MetaMaskService";
import ImportBitcoinWallet from "./ImportBitcoinWallet";
import SendBitcoinTransaction from "./SendBitcoinTransaction.js";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Button
        title="Go to Live Price of Bitcoin and USDT"
        onPress={() => navigation.navigate("Price")}
      />

      <Button
        title="Import Bitcoin Wallet"
        onPress={() => navigation.navigate("Bitcoin")}
      />

      <Button
        title="Import Polygon Wallet"
        onPress={() => navigation.navigate("Polygon")}
      />

      <Button
        title="Send Polygon Transaction"
        onPress={() => navigation.navigate("SendPolygon")}
      />

      <Button
        title="Send Bitcoin Transaction"
        onPress={() => navigation.navigate("SendBitcoin")}
      />
    </View>
  );
};

const BalanceScreen = () => {
  return <ProfileScreen />;
};

const BitcoinWallet = () => {
  return <ImportBitcoinWallet />;
};

const PolygonWallet = () => {
  return <ImportPolygonWallet />;
};

const BtcWallet = () => {
  return <SendBitcoinTransaction />;
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CryptoWallet" component={HomeScreen} />
        <Stack.Screen name="Price" component={BalanceScreen} />
        <Stack.Screen name="Bitcoin" component={BitcoinWallet} />
        <Stack.Screen name="Polygon" component={PolygonWallet} />
        <Stack.Screen name="SendPolygon" component={MetaMaskService} />
        <Stack.Screen name="SendBitcoin" component={BtcWallet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

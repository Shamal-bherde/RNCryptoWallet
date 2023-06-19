import { observable, action } from "mobx";
import axios from "axios";

class ProfileStore {
  // const [bitcoinPrice, setBitcoinPrice] = useState(' ');
  // const [usdtPrice, setBitcoinPrice] = useState(' ');

  @observable bitcoinPrice = this.bitcoinPrice;
  @observable usdtPrice = this.usdtPrice;

  @action fetchPrices() {
    // Fetch Bitcoin price
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      )
      .then((response) => {
        const { bitcoin } = response.data;
        this.bitcoinPrice = bitcoin.usd;
        // setBitcoin(this.bitcoinPrice);
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
        this.usdtPrice = tether.usd;
      })
      .catch((error) => {
        console.error("Failed to fetch USDT price:", error);
      });
  }
}

const profileStore = new ProfileStore();
export default profileStore;

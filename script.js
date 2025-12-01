"use strict";
//dom elements
const compareBtn = document.getElementById("compareBtn");
const resultContainer = document.getElementById("result");
const output = document.getElementById("output");
const bybitContainer = document.getElementById("bybitContainer");
const binanceContainer = document.getElementById("binanceContainer");
const kucoinContainer = document.getElementById("kucoinContainer");

resultContainer.classList.add("invisible");

//main function to fetch token data from two exchanges
function fetchTokenData() {
  //get dom elements
  const tokenInput = document.getElementById("tokenInput").value;
  const tradingPairInput = document.getElementById("tradingPairInput").value;
  const kucoinFullTokenInput = tokenInput + "-" + tradingPairInput;
  const fullTokenInput = tokenInput + tradingPairInput;

  //   input validation
  if (tokenInput.length === 0 || tradingPairInput.length === 0) {
    alert(`
      Please fill all input fields
      `);
    return;
  }
  resultContainer.classList.remove("invisible");
  resultContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  //call websocket functions
  bybitWebSocket(fullTokenInput.toUpperCase());
  binanceWebSocket(fullTokenInput.toLowerCase());
  kucoinWebSocket(kucoinFullTokenInput.toUpperCase());
}
compareBtn.addEventListener("click", fetchTokenData);

//functions to get data from cex websocket

//binance websocket
function binanceWebSocket(token) {
  binanceContainer.innerHTML = "<p>Loading...</p>";
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${token}@trade`);
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // use data
    binanceContainer.innerHTML = `
      <p>Latest trade for ${token} on Binance:</p>
      <p>Price: ${data.p}</p>
      <p>Quantity: ${data.q}</p>
      <p>Trade Time: ${new Date(data.T).toLocaleString()}</p>
    `;
  };
}

//bybit websocket
function bybitWebSocket(token) {
  bybitContainer.innerHTML = "<p>Loading...</p>";
  const bybitWs = new WebSocket("wss://stream.bybit.com/v5/public/spot");

  bybitWs.onopen = () => {
    console.log("Bybit connected");
    bybitWs.send(
      JSON.stringify({
        op: "subscribe",
        args: [`publicTrade.${token}`],
      })
    );
  };

  bybitWs.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.data) {
      bybitContainer.innerHTML = `
        <p>Latest trade for ${token} on Bybit:</p>
        <p>Price: ${data.data[0]?.p}</p>
        <p>Trade Time: ${new Date(data.data[0]?.T).toLocaleString()}</p>
      `;
    }
  };

  bybitWs.onerror = (error) => {
    console.error("Bybit error:", error);
  };
}

//kucoin websocket
function kucoinWebSocket(token) {
  kucoinContainer.innerHTML = "<p>Loading...</p>";

  // Use CORS proxy
  const proxyUrl = "https://corsproxy.io/?";
  const apiUrl = "https://api.kucoin.com/api/v1/bullet-public";

  fetch(proxyUrl + encodeURIComponent(apiUrl), { method: "POST" })
    .then((response) => response.json())
    .then((result) => {
      const kucointoken = result.data.token;
      const endpoint = result.data.instanceServers[0].endpoint;

      const kucoinWs = new WebSocket(`${endpoint}?token=${kucointoken}`);

      kucoinWs.onopen = () => {
        console.log("KuCoin connected");
        kucoinWs.send(
          JSON.stringify({
            type: "subscribe",
            topic: `/market/ticker:${token}`,
          })
        );
      };

      kucoinWs.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.data) {
          kucoinContainer.innerHTML = `
            <p>Latest trade for ${token} on KuCoin:</p>
            <p>Price: ${data.data.price}</p>
            <p>Change: ${data.data.changeRate}</p>
            <p>Trade Time: ${new Date(data.data.time).toLocaleString()}</p>
          `;
        }
      };

      kucoinWs.onerror = (error) => {
        console.error("KuCoin error:", error);
      };
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      kucoinContainer.innerHTML = "<p>Error connecting to KuCoin</p>";
    });
}

# Crypto Dashboard

A real-time cryptocurrency price comparison tool that fetches and displays token prices across multiple exchanges (Bybit, Binance, and KuCoin).

## 🚀 Features

- Real-time price comparison across 3 major exchanges (Bybit, Binance, KuCoin)
- WebSocket integration for live price updates
- Search tokens by symbol and trading pair
- Clean, responsive UI with smooth animations
- Visual price data display with exchange-specific formatting
- Support for multiple cryptocurrency trading pairs

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Responsive design with flexbox and animations
- **JavaScript (ES6+)** - Async/await, WebSocket API, DOM manipulation
- **WebSocket API** - Real-time data streaming from exchanges
- **Exchange APIs** - Bybit, Binance, and KuCoin public APIs

## 💡 Key Technical Challenges

The main challenge was implementing WebSocket connections to three different cryptocurrency exchanges simultaneously, each with their own unique API protocols and data formats. I had to parse and standardize the price data from different exchange APIs, handle connection failures gracefully, and manage multiple concurrent WebSocket connections without memory leaks. Additionally, formatting real-time price updates with proper error handling while maintaining a responsive UI required careful state management and event-driven architecture.

## 📦 Installation & Setup

1. Clone the repository
   ```bash
   git clone https://github.com/HarDexTech/cryptoDashboard.git
   cd cryptoDashboard
   ```
2. Open `index.html` in your browser
3. No additional dependencies required - runs entirely in the browser

## 🔗 Live Demo

[View Live Demo](https://hardextech.github.io/cryptoDashboard/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Adesina Ayomide Emmanuel**

- GitHub: [@HarDexTech](https://github.com/HarDexTech)
- LinkedIn: [hardextech](https://linkedin.com/in/hardextech)

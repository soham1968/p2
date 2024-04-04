async function fetchData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function renderTable(cryptos) {
  const tableBody = document.getElementById("cryptoTableBody");
  tableBody.innerHTML = "";
  cryptos.forEach((crypto) => {
    const row = document.createElement("tr");
    row.innerHTML = `
  <td><img src="${crypto.image}" alt="${crypto.name}" style="width: 50px;"></td>
  <td>${crypto.name}</td>
  <td>${crypto.symbol}</td>
  <td>${crypto.current_price}</td>
  <td>Mkt cap : $${crypto.total_volume}</td>
`;
    tableBody.appendChild(row);
  });
}

function searchCrypto() {
  const searchText = document.getElementById("searchInput").value.toLowerCase();
  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchText) ||
      crypto.symbol.toLowerCase().includes(searchText)
  );
  renderTable(filteredCryptos);
}

let cryptos = [];
fetchData().then((data) => {
  cryptos = data;
  renderTable(cryptos);
});

async function sortMarketCap() {
  cryptos.sort((a, b) => b.market_cap - a.market_cap);
  renderTable(cryptos);
}

async function sortPercentageChange() {
  cryptos.sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );
  renderTable(cryptos);
}

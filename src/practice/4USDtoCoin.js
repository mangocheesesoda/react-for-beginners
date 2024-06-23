import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selCoinPrice, setSelCoinPrice] = useState("");
  const [selCoinName, setSelCoinName] = useState("");
  const [USD, setUSD] = useState("");
  const [result, setResult] = useState("");

  const onChangeUSD = (event) => setUSD(event.target.value);
  const onChangeCoin = (event) => {
    setSelCoinPrice(event.target.value);
    setSelCoinName(event.target.options[event.target.selectedIndex].id);    
  };

  //인풋에 입력한 달러 또는 셀렉트 코인 바뀔 때
  useEffect(() => {
    //인풋이 비어있으면 결과값 지우기
    if(USD === "") {
      setResult("");
      return;
    }
    
    //젤 첨 로딩될 때 첫번째 옵션 값으로 선택값 세팅해줌
    if(selCoinPrice === "") {
      setSelCoinPrice(document.getElementsByTagName("option")[0].value);
      setSelCoinName(document.getElementsByTagName("option")[0].id);
    }
    
    setResult("you can get \"" + (USD / selCoinPrice) + " " + selCoinName + "\"");

  }, [USD, selCoinPrice, selCoinName]);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading 
        ? (<strong>Loading...</strong>) 
        : (
            <div>
              <input 
                onChange={onChangeUSD} 
                value={USD}
                type="number" 
                placeholder="how many dollars"
              />
              
              <p />
              <select onChange={onChangeCoin}>
                {coins.map((coin, index) => 
                  (
                    <option key={index} value={coin.quotes.USD.price} id={coin.symbol}>
                      {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
                    </option>
                  )
                )}
              </select>
              <p/>
              <h4>{result}</h4>
            </div>
          )
      }
    </div>
  );
}

export default App;

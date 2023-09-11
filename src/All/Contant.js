import React, { useEffect, useState } from 'react'
import Selected from './Selected'
import Tables from './Tables'
import Request from './Request';

const Contant = () => {

  const Stock_URL = 'http://localhost:3500/stock';
  const Market_URL = 'http://localhost:3500/market';

  const [displayMarket, setDisplayMarket] = useState([]);
  const [displayStock, setDisplayStock] = useState([])
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [availableQuantity, setAvailableQuantity] = useState("")
  const [quantity, setQuantity] = useState("0")

  const [data, setData] = useState([
    {
      key: '1',
      market: selectedMarket,
      stock: selectedStock,
      availableQuantity: availableQuantity,
      quantity: quantity,
    }
  ]);
  
  useEffect (() => {
    const fetchData = async () => {
      try {
        const responce = await fetch(Market_URL);
        const market = await responce.json();
        setDisplayMarket(market);
        // console.log(market);

        const responce1 = await fetch(Stock_URL)
        const stock = await responce1.json();
        setDisplayStock(stock)
        // console.log(stock);
      }
      catch (err) {
        console.log(err.message);
      }
    }
    (async () => await fetchData())()
  }, []);

  const marketOptions = displayMarket.map((market) => (
    {
        key: market.id,
        value: market.name,
        label: market.name,
    }
  ))

  const stockOptions = displayStock.map((stock) => (
    {
        key: stock.id,
        value: stock.name,
        label: stock.name,
        availableQuantity: stock.quantity,
    }
  ))

  return (
    <>
      <div className='select'>
        <Selected
          displayMarket = {displayMarket}
          displayStock = {displayStock}
          selectedStock = {selectedStock}
          setSelectedStock = {setSelectedStock}
          selectedMarket = {selectedMarket}
          setSelectedMarket ={setSelectedMarket}
          marketOptions = {marketOptions}
          stockOptions = {stockOptions}
          setAvailableQuantity = {setAvailableQuantity}
        />
      </div>
    
      {(selectedStock && selectedMarket) && (
        <div  className='table'>
          <Tables 
            selectedMarket = {selectedMarket}
            selectedStock = {selectedStock}
            availableQuantity  = {availableQuantity}
            data = {data}
            setData = {setData}
            quantity = {quantity}
          />
        </div>
      )}
    
      {(selectedStock && selectedMarket) && (
        <div className='request'>
          <Request />
        </div>
      )}

    </>
  )
}

export default Contant
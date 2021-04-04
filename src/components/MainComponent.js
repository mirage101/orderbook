import React, {useState} from 'react'
import OrderBook from './OrderBook';

const SelectEl = () => {
    
  const [selectedClient,setSelectedClient] = useState(['btcusdt']);

  return (
    <div>
      <h2>Choose traiding pair:</h2>      
      <div className="custom-select">
        <select className="select-pair" value={selectedClient} onChange={e => setSelectedClient(e.target.value)}>
          <option value="btcusdt">BTC/USDT</option>
          <option value="ethbtc">BTC/ETH</option>      
        </select>
         <div className="custom-arrow"></div>
      </div>
      <OrderBook tradepairs={selectedClient}/>
    </div>
  )
}


export default SelectEl;
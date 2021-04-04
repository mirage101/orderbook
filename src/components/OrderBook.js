import React, {useState, useEffect} from 'react'
import Loading from './Loading'

const OrderBook = (props) =>{
    const [orders, setOrders] = useState([]);
    
    const currPair = props.tradepairs;//ethusdt /btcusdt /ethbtc
    const streamType = '@ticker';
    const paramMsg = `${currPair}${streamType}`;
    let loading = false;
    
  

    useEffect(() =>{
        
        const msg = {
            method: 'SUBSCRIBE',
            params: [paramMsg],
            id: 1,
          };
        const ws = new WebSocket('wss://stream.binance.com:9443/ws');

        ws.onopen = () =>{
            ws.send(JSON.stringify(msg));
        };
        ws.onmessage = (event) => {
            const response = JSON.parse(event.data);
            //console.log(response)            
            setOrders(response);            
        };
        ws.onclose = () =>{
            ws.close();
        };

        return () =>{
            ws.close();

        };

    }, [currPair]);

    //const orders;

    if(orders.result === null){            
        loading = true
    }else{
        loading = false
    }
    
   return (
        <div>           
        {/* {props.tradepairs} */}
        {loading ? <Loading type="spin" color="gray" /> : ''}        
        <div className="order-container">
        
            <table>
            <thead>
                <tr>
                    <th colSpan="2">Bids</th>
                </tr>
                <tr>
                    <th>Amount </th>
                    <th>Price</th>
                </tr>
            </thead>
                <tbody>
                  <tr>
                    <td>{parseFloat(orders['B'])}</td>
                    <td>{parseFloat(orders['b'])}</td>
                  </tr>
                </tbody>
            </table>

            <table>
            <thead>
                <tr>
                    <th colSpan="2">Asks</th>
                </tr>
                <tr>
                   <th>Amount</th>
                   <th>Price</th>
                </tr>
            </thead>
                <tbody>
                    <tr>
                      <td>{parseFloat(orders['A'])}</td>
                      <td>{parseFloat(orders['a'])}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    );

};

export default OrderBook;
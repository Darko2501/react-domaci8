import { useContext } from "react";
import { CurrencyContext,AmountContext } from "../App";
import CURRENCYS from "../Utils/Currencys";


const Exchange=()=>{
    const currency=useContext(CurrencyContext);
    const amount=useContext(AmountContext);
    const cours=CURRENCYS[currency]
    const value=amount*cours

    return(
        <>
        <h3>FAST MONEY EXCHANGE</h3>
        <h5>{currency} - {amount}={value} RSD</h5>
        </>
    )

};

export default Exchange;
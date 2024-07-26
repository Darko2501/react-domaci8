
import './App.css';
import Exchange from './Components/Exchange';
import { createContext, useEffect, useReducer, useState } from 'react';
import CURRENCYS from './Utils/Currencys';
import { initialUserState, loadUserState, userReducer } from './Reducers/User';

export const CurrencyContext = createContext('EUR');
export const AmountContext = createContext(0);

function App() {
    const [amount, setAmount] = useState(0);
    const addAmount = (e) => {
        setAmount(parseFloat(e.target.value));
    };

    const [currency, setCurrency] = useState('EUR');
    const newCurrency = (e) => {
        setCurrency(e.target.value);
    };

    const [userState, dispatch] = useReducer(userReducer, loadUserState());
    const saveUser = () => {
        if (userState.username === null || userState.username.trim() === '' || userState.money === null || isNaN(userState.money)) {
            return;
        }
        dispatch({ type: "SET_USER_CREATED", payload: true });

    };
    useEffect(()=>{
        if(userState.isUserCreated){}
        localStorage.setItem("userState",JSON.stringify(userState))
    },[userState])

    return (
        <>
            <h2>Exchange office</h2>
            <CurrencyContext.Provider value={currency}>
                <AmountContext.Provider value={amount}>
                    <Exchange />
                    <input placeholder='Enter amount' onInput={addAmount} />
                    <select value={currency} onChange={newCurrency}>
                        {Object.keys(CURRENCYS).map((currency) =>
                            <option key={currency} value={currency}>{currency}</option>
                        )}
                    </select>
                </AmountContext.Provider>
            </CurrencyContext.Provider>
            {!userState.isUserCreated &&
                <form>
                    <input placeholder='Enter your name' onInput={e => dispatch({ type: "SET_USERNAME", payload: e.target.value })} />
                    <input placeholder='Enter your amount money' onInput={e => dispatch({ type: "SET_MONEY", payload: e.target.value })} />
                    <button type='button' onClick={saveUser}>Create user</button>
                </form>
            }
        </>
    );
}

export default App;


import {useState} from 'react';
import '../CSS/Slider.css';
import Chart from './Chart'

export default function Slider(){

    // Starting Homepage variable declaration
    let [monthlyPayment, setMonthlyPayment] = useState(45.29);
    let[data, setData]= useState({
        homeValue: 3000,
        downPayment : 3000 * 0.2,
        loanAmt: 3000 * 0.8,
        interestRate: 5,
        yearsTenure:5
    });

        
    //Home Loan
    function homeLoan(e){
        let newData = {...data};
        let newVal = e.target.value;
        setData({
            ...newData,
            homeValue: newVal,
            downPayment: newVal * 0.2,
            loanAmt: newVal * 0.8,
        });
        setPayment();
    }

    // Down Payment
    function downPaymentChange(e){
        let newData = {...data};
        newData.downPayment = e.target.value;
        newData.loanAmt = newData.homeValue - newData.downPayment;
        setData(newData);
        setPayment();
    }

    //Loan Amount
    function loanAmountChange(e){
        let newData = {...data};
        newData.loanAmt = e.target.value;
        newData.downPayment = newData.homeValue - newData.loanAmt;
        setData(newData);
        setPayment();
    }

    //Interest Rate
    function interestRateChange(e){
        let newData = {...data};
        newData.interestRate = e.target.value;
        setData(newData);
        setPayment();
    }

    //set monthly payment
    function setPayment(){
        let newData = {...data}
        let interestPerMonth = (newData.interestRate/100)/12;
        let loanAmount = newData.loanAmt;
        let totalLoanMonths = (newData.yearsTenure * 12);
        let monthlyPay = (loanAmount * interestPerMonth *(1 + interestPerMonth) ** totalLoanMonths) / ((1 + interestPerMonth) ** totalLoanMonths - 1);
        setMonthlyPayment((monthlyPay).toFixed(2));
    }

    //tenure years
    function tenureYears(e){
        let newData = {...data}
        newData.yearsTenure=e.target.value;
        setData(newData);
    }

    return(
        <div className='container'>
            <div className='slider'>
                {/* Home Loan */}
                <div className='home-value'>
                    <label htmlFor='homeValue'>Home Value</label>
                    <p className='value-amt'>$ {data.homeValue}</p>
                    <input
                        type='range'
                        min={1000}
                        max={10000}
                        step={100}
                        value={data.homeValue}
                        onChange={(e)=>homeLoan(e)}
                        />

                        <div className="rangeValue">
                            <p>$ 1000</p>
                            <p>$ 10000</p>
                        </div>
                </div>
                
                {/* down Payment */}
                <div className='down-payment'>
                    <label htmlFor='downPayment'>Down Payment</label>
                    <p className=''>$ {data.downPayment}</p>
                    <input
                        type='range'
                        min={0}
                        max={data.homeValue}
                        step={100}
                        value={data.downPayment}
                        onChange={(e)=>downPaymentChange(e)}
                        />
                        
                        <div className="rangeValue">
                            <p>$ 0</p>
                            <p>$ {data.homeValue}</p>
                        </div>
                </div>

                {/* Loan Amount */}
                <div className='home-value'>
                    <label htmlFor='homeValue'>Loan Amount</label>
                    <p className='value-amt'>$ {data.loanAmt}</p>
                    <input
                        type='range'
                        min={0}
                        max={data.homeValue}
                        step={100}
                        value={data.loanAmt}
                        onChange={(e)=>loanAmountChange(e)}
                        />

                        <div className="rangeValue">
                            <p>$ 0</p>
                            <p>$ {data.homeValue}</p>
                        </div>
                </div>

                {/* Interest Rate */}
                <div className='Interest-rate'>
                    <label htmlFor='interestRate'>Interest Rate</label>
                    <p className='value-amt'> {data.interestRate} %</p>
                    <input
                        type='range'
                        min={2}
                        max={18}
                        value={data.interestRate}
                        onChange={(e)=>interestRateChange(e)}
                        />

                        <div className="rangeValue">
                            <p>2 %</p>
                            <p>18 %</p>
                        </div>

                        {/* Tenure Years */}
                    <div className="tenure">
                        <label htmlFor="loan tenure">Tenure (Years)</label>
                        <select name="years" id="years" onChange={(e)=>tenureYears(e)}>
                            <option value={5}>5 years</option>
                            <option value={10}>10 years</option>
                            <option value={15}>15 years</option>
                            <option value={20}>20 years</option>
                            <option value={25}>25 years</option>
                        </select>
                    </div>
                </div>
                
            </div>

            {/* Chart Component */}

            <div className="pieChart">
                <h1>Monthly Payment : {monthlyPayment} </h1>
                <Chart data={data}/>
            </div>
        </div>

    );

}

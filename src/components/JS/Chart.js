import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

export default function Chart({data}){

    ChartJS.register(ArcElement, Tooltip, Legend);
    const { homeValue, loanAmt, yearsTenure, interestRate } = data;

    let interestPerMonth = (interestRate/100)/12;
    let totalLoanMonths = (yearsTenure * 12);
    let monthlyPayment = (loanAmt * interestPerMonth *(1 + interestPerMonth) ** totalLoanMonths) / ((1 + interestPerMonth) ** totalLoanMonths - 1);
    let totalInterestGenerated = monthlyPayment * totalLoanMonths - loanAmt;

    const pieChartData = {
        labels: ["Principle", "Interest"],
        datasets: [
            {
            label: "Ratio of Principle and Interest",
            data: [homeValue, totalInterestGenerated],
            backgroundColor: ["rgba(22, 255, 0, 0.4)", "rgba(208, 212, 202, 0.4)"],
            borderColor: ["rgba(22, 255, 0, 1)", "rgba(208, 212, 202, 1)"],
            borderWidth: 2,
            },
        ],
    };
    return(
        <Pie data={pieChartData} />
    );
}
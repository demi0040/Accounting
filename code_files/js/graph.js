const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
let expensesTotalData = []
let incomeTotalData = []

let tJen = 0,
    tFeb = 0,
    tMar = 0,
    tApr = 0,
    tMay = 0,
    tJune = 0,
    tJuly = 0,
    tAug = 0,
    tSept = 0,
    tOct = 0,
    tNov = 0,
    tDec = 0

fetch('./code_files/data/donors_income2.json')
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        incomeDateData(data)
    })
    .catch(function(err) {
        console.log(err)
    })

function incomeDateData(data) {
    data.forEach(element => {
        element.donations.forEach(element => {
            let myDate = new Date(element.date.replace(/-/g, '\/'))
            let myMonht = myDate.getMonth()

            switch (myMonht) {
                case 0:
                    tJen += element.amount
                    break;
                case 1:
                    tFeb += element.amount
                    break;
                case 2:
                    tMar += element.amount
                    break;
                case 3:
                    tApr += element.amount
                    break;
                case 4:
                    tMay += element.amount
                    break;
                case 5:
                    tJune += element.amount
                    break;
                case 6:
                    tJuly += element.amount
                    break;
                case 7:
                    tAug += element.amount
                    break;
                case 8:
                    tSept += element.amount
                    break;
                case 9:
                    tOct += element.amount
                    break;
                case 10:
                    tNov += element.amount
                    break;
                case 11:
                    tDec += element.amount
                    break;

                default:
                    break;
            }
        })

    });

    incomeTotalData.push(tJen.toFixed(2), tFeb.toFixed(2), tMar.toFixed(2), tApr.toFixed(2), tMay.toFixed(2), tJune.toFixed(2), tJuly.toFixed(2), tAug.toFixed(2), tSept.toFixed(2), tOct.toFixed(2), tNov.toFixed(2), tDec.toFixed(2))

    const cti = document.querySelectorAll(".inc-chart");
    const incChart = new Chart(cti, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: '# of Total Amount',
                data: incomeTotalData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    return incomeTotalData
}

fetch('./code_files/data/expenses.json')
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        expensesDateData(data)
        mixDateData(incomeTotalData, expensesTotalData)
    })
    .catch(function(err) {
        console.log(err)
    })

function expensesDateData(data) {
    data.forEach(element => {
        let myDate = new Date(element.date.replace(/-/g, '\/'))
        let myMonht = myDate.getMonth()

        switch (myMonht) {
            case 0:
                tJen += element.amount
                break;
            case 1:
                tFeb += element.amount
                break;
            case 2:
                tMar += element.amount
                break;
            case 3:
                tApr += element.amount
                break;
            case 4:
                tMay += element.amount
                break;
            case 5:
                tJune += element.amount
                break;
            case 6:
                tJuly += element.amount
                break;
            case 7:
                tAug += element.amount
                break;
            case 8:
                tSept += element.amount
                break;
            case 9:
                tOct += element.amount
                break;
            case 10:
                tNov += element.amount
                break;
            case 11:
                tDec += element.amount
                break;
            default:
                break;
        }
    })

    expensesTotalData.push(tJen.toFixed(2), tFeb.toFixed(2), tMar.toFixed(2), tApr.toFixed(2), tMay.toFixed(2), tJune.toFixed(2), tJuly.toFixed(2), tAug.toFixed(2), tSept.toFixed(2), tOct.toFixed(2), tNov.toFixed(2), tDec.toFixed(2))

    const ctx = document.querySelectorAll(".exp-chart");
    const expChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: '# of Total Amount',
                data: expensesTotalData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
    return expensesTotalData
}

function mixDateData(params, params2) {

    const ctm = document.querySelectorAll(".mix-chart");
    const mixedChart = new Chart(ctm, {
        data: {
            datasets: [{
                type: 'bar',
                label: 'Income',
                data: incomeTotalData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                type: 'line',
                label: 'Expenses',
                data: expensesTotalData,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }],
            labels: months,
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}



// DATA TABLE

$(document).ready(function() {
    $(".data-table").each(function(_, table) {
        $(table).DataTable();
    });
});
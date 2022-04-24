// Donors and Income
fetch('./code_files/data/donors_income2.json')
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        incomeData(data)
        tableData(data)
    })
    .catch(function(err) {
        console.log(err)
    })

function incomeData(data) {
    let donorsIncome = []
    let print = ""
    for (let i = 0; i < data.length; i++) {
        data[i].donations.forEach(element => {
            donorsIncome.push([element.date, data[i].donors.first_name + " " + data[i].donors.last_name, element.amount, element.type])
            localStorage.setItem('session', JSON.stringify(donorsIncome))
        })
    }

    donorsIncome.sort()
    const lastFive = donorsIncome.slice(donorsIncome.length - 5, donorsIncome.length)

    lastFive.forEach(element => {
        print += `<tr><td>${element[0]}</td><td>${element[1]}</td><td>$${element[2]}</td><td>${element[3]}</td></tr>`
    })

    document.getElementById("lastFiveIncome").innerHTML = print
}

function tableData(data) {
    let tableInf = []
    let printTable = ""
    let print = ""
    let total = 0
    let difference = 0

    for (let i = 0; i < data.length; i++) {
        total = data[i].donations.reduce(function(prev, cur) {
            return prev + cur.amount
        }, 0)

        difference = data[i].donors.promise - total

        tableInf.push([difference, data[i].donors.address, data[i].donors.area, data[i].donors.group, data[i].donors.promise, total, data[i].donors.first_name + " " + data[i].donors.last_name])

        localStorage.setItem('session', JSON.stringify(tableInf))
    }

    tableInf.sort((a, b) => a[0] - b[0])

    const lastFive = tableInf.slice(tableInf.length - 5, tableInf.length)

    tableInf.forEach(element => {
        printTable += `<tr><td>${element[6]}</td><td>${element[1]}</td><td>${element[2]}</td><td>${element[3]}</td><td>$${element[4]}</td><td>$${element[5].toFixed(2)}</td><td>$${element[0].toFixed(2)}</td></tr>`
    })

    lastFive.forEach(element => {
        print += `<tr><td>${element[6]}</td><td>$${element[4]}</td><td>$${element[5].toFixed(2)}</td><td>$${element[0].toFixed(2)}</td></tr>`
    })

    document.getElementById("printTable").innerHTML = printTable
    document.getElementById("printPromise").innerHTML = print
}

// Expenses

fetch('./code_files/data/expenses.json')
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        expensesData(data)
    })
    .catch(function(err) {
        console.log(err)
    })

function expensesData(data) {
    let expenses = []
    let print = ""
    data.forEach(element => {
        expenses.push([element.date, element.expense_name.substring(0, 10), element.amount, element.type])
        localStorage.setItem('session', JSON.stringify(expenses))
    })
    expenses.sort()
    const lastFive = expenses.slice(expenses.length - 5, expenses.length)

    lastFive.forEach(element => {
        print += `<tr><td>${element[0]}</td><td>${element[1]}</td><td>$${element[2]}</td><td>${element[3]}</td></tr>`
    })

    document.getElementById("lastFiveExpenses").innerHTML = print


}
// Donors and Income
fetch('./code_files/data/donors_income2.json')
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        incomeTable(data)
        incomeData(data)
        incomePromData(tableInf)
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
let tableInf = []

function incomeTable(data) {
    let incPrintTable = ""
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

    tableInf.forEach(element => {
        incPrintTable += `<tr><td>${element[6]}</td><td>${element[1]}</td><td>${element[2]}</td><td>${element[3]}</td><td>$${element[4]}</td><td>$${element[5].toFixed(2)}</td><td class="fw-bold">$${element[0].toFixed(2)}</td></tr>`
    })

    document.getElementById("myIncTable").innerHTML = `<table id="example" class="table table-striped data-table" style="width: 100%"><thead><tr><th>Name</th><th>Address</th><th>Area</th><th>Group</th><th>Promise</th><th>Total Donation</th><th>Difference</th></tr></thead><tbody id="incPrintTable"></tbody><tfoot><tr><th>Name</th><th>Address</th><th>Area</th><th>Group</th><th>Promise</th><th>Total Donation</th><th>Difference</th></tr></tfoot></table>`

    document.getElementById("incPrintTable").innerHTML = incPrintTable
    return tableInf
}

function incomePromData(tableInf) {
    let printProm = ""
    tableInf.sort((a, b) => a[0] - b[0])

    const lastFive = tableInf.slice(tableInf.length - 5, tableInf.length)

    lastFive.forEach(element => {
        printProm += `<tr><td>${element[6]}</td><td>$${element[4].toFixed(0)}</td><td>$${element[5].toFixed(0)}</td><td class="fw-bold">$${element[0].toFixed(0)}</td></tr>`
    })
    document.getElementById("printPromise").innerHTML = printProm
}

// Expenses

fetch('./code_files/data/expenses.json')
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        expensesData(data)
        expenseTable(expenses)
    })
    .catch(function(err) {
        console.log(err)
    })

let expenses = []

function expensesData(data) {
    let print = ""

    data.forEach(element => {
        expenses.push([element.date, element.expense_name, element.amount, element.type, element.category])
        localStorage.setItem('session', JSON.stringify(expenses))
    })
    expenses.sort()
    const lastFive = expenses.slice(expenses.length - 5, expenses.length)

    lastFive.forEach(element => {
        print += `<tr><td>${element[0]}</td><td>${element[1].substring(0, 10)}</td><td>$${element[2]}</td><td>${element[3]}</td></tr>`
    })

    document.getElementById("lastFiveExpenses").innerHTML = print
    return expenses
}

function expenseTable(expenses) {
    let expTablePrint = ""
    expenses.forEach(element => {
        expTablePrint += `<tr><td>${element[0]}</td><td>${element[2]}</td><td>${element[1].substring(0, 10)}</td><td>$${element[2]}</td><td>${element[3]}</td></tr>`
    })
    document.getElementById("expTablePrint").innerHTML = expTablePrint
}
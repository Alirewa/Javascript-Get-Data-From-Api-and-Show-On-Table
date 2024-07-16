const API_URL = "http://localhost:3000/transactions";
const toggleBtn = document.querySelector(".show-content-btn-toggle");
const tableContainer = document.querySelector("#table");
const searchInput = document.querySelector("#search-input");

toggleBtn.addEventListener("click", () => {
  const headerContent = document.querySelector(".content-toggle");
  const tableContent = document.querySelector(".header");
  headerContent.classList.add("hidden");
  tableContent.classList.remove("hidden");
});

document.addEventListener("DOMContentLoaded", init);
function init() {
  Transactions.getTransactions();
}

class Transactions {
  constructor(transaction) {
    this.id = transaction.id;
    this.type = transaction.type;
    this.price = transaction.price;
    this.refId = transaction.refId;
    this.date = transaction.date;
  }
  static getTransactions() {
    fetch(API_URL)
      .then((res) => res.json())
      .then((transactionArr) => {
        searchInput.addEventListener("input", (e) => {
          this.refId = e.target.value;
        });
        this.renderTransactions(transactionArr);
      });
  }
  static renderTransactions(data) {
    let result = `<tr>
    <th>ردیف</th>
    <th>نوع تراکنش</th>
    <th>مبلغ</th>
    <th>شماره پیگیری</th>
    <th>تاریخ تراکنش</th>
  </tr>`;
    data.forEach((item) => {
      result += `<tr>
            <th>${item.id}</th>
            <th>${item.type}</th>
            <th>${item.price}</th>
            <th>${item.refId}</th>
            <th>${item.date}</th>
          </tr>`;
    });
    tableContainer.innerHTML = result;
  }
}

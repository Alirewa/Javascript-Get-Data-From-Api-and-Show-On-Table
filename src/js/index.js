const btn = document.querySelector("#show-btn");
const searchInput = document.querySelector(".transactions__search-box");
const lists = document.querySelector(".transactions__lists");
const listsContainer = document.querySelector(".transactions__table");
const caretIcon = document.querySelectorAll(".caret-icon");

let allTransactionsData = [];
let searchItem = "";
let sortBy = "";
let sortOrder = "";

const httpRequestHandler = () => {
  axios
    .get(
      sortBy && sortOrder
        ? `http://localhost:3000/transactions?_sort=${sortBy}&_order=${sortOrder}&refId_like=${searchItem} `
        : `http://localhost:3000/transactions?refId_like=${searchItem}`
    )
    .then((res) => {
      allTransactionsData = res.data;
      renderTransactions(res.data);
    })
    .catch((err) => console.log(err));
};

const renderTransactions = (data) => {
  btn.classList.add("hidden");
  searchInput.classList.remove("hidden");
  listsContainer.classList.remove("hidden");
  lists.innerHTML = data
    .map(
      (item) =>
        `<tr>
        <td>${item.id}</td>
        <td class="${
          item.type === "برداشت از حساب" ? "color-red" : "color-green"
        }">${item.type}</td>
        <td>${item.price}</td>
        <td>${item.refId}</td>
        <td>${new Date(item.date).toLocaleDateString("fa-IR")}</td>
      </tr>`
    )
    .join("\n");
};

btn.addEventListener("click", httpRequestHandler);
searchInput.addEventListener("input", (e) => {
  searchItem = e.target.value;
  httpRequestHandler();
});
caretIcon.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.target.classList.toggle("rotate-up");
    sortBy = e.target.dataset.type;
    sortOrder = e.target.classList.contains("rotate-up") ? "desc" : "asc";
    httpRequestHandler();
  });
});

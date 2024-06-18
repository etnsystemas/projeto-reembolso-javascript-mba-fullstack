//Seleciona os elementos do formulário
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');



amount.oninput = (e) => {
  let value = e.target.value.replace(/\D/g, "");
  //Transforma o valor em centavos (exemplo: 150/100 = 1.5 que é equivalente a R$ 1,50)
  value = Number(value) / 100
  amount.value = formatCurrencyBRL(value);
}

function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return value;
}

form.onsubmit = (event) => {
  event.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }

  expenseAdd(newExpense);




}

function expenseAdd(newExpense) {
  try {
    
  } catch (error) {
    alert('Não foi possível atualizar a lista de despesas.');
    console.log(error);

  }
}
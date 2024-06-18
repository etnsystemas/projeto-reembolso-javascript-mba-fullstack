//Seleciona os elementos do formulário
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');

// Seleciona os elementos da Lista.
const expenseList = document.querySelector('ul');



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
    // Cria o elemento li para adicionar o item(li) na lista (ul).
    const expenseItem = document.createElement('li');
    expenseItem.classList.add('expense');

    // cria o ícone da categoria
    const expenseIcon = document.createElement('img');
    expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute('alt', newExpense.category_name);

    //Adiciona as informações no item
    expenseItem.append(expenseIcon);
    expenseList.append(expenseItem);

  } catch (error) {
    alert('Não foi possível atualizar a lista de despesas.');
    console.log(error);

  }
}
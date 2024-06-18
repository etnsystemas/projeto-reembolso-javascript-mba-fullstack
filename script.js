//Seleciona os elementos do formulário
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');

// Seleciona os elementos da Lista.
const expenseList = document.querySelector('ul');
const expensesTotal = document.querySelector('aside header h2');
const expensesQuantity = document.querySelector('aside header p span');



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

    // cria a info da despesa
    const expenseInfo = document.createElement('div');
    expenseInfo.classList.add('expense-info');

    //Cria o nome da despesa
    const expenseName = document.createElement('strong');
    expenseName.textContent = newExpense.expense;

    //Cria a categoria da despesa
    const expenseCategory = document.createElement('span');
    expenseCategory.textContent = newExpense.category_name;

    // Adiciona nome e categoria na div das informações da despesa
    expenseInfo.append(expenseName, expenseCategory);


    // Cria o valor da despesa
    const expenseAmount = document.createElement('span');
    expenseAmount.classList.add('expense-amount');
    expenseAmount.innerHTML = `<small>R$</small> ${newExpense.amount
      .toUpperCase()
      .replace('R$', '')}`;

    // cria ícone de remover
      const removeIcon = document.createElement('img');
      removeIcon.classList.add('remove-icon');
      removeIcon.setAttribute('src', 'img/remove.svg');
      removeIcon.setAttribute('alt', 'remover');

    //Adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    //Adiciona o item a lista
    expenseList.append(expenseItem);

    //Atualiza os totais
    updateTotals();

  } catch (error) {
    alert('Não foi possível atualizar a lista de despesas.');
    console.log(error);

  }
}

//Atualiza totais
function updateTotals(){
  try {
    const items = expenseList.children;
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? 'despesas' : 'despesa'}`;

    let total = 0;

    for(let item=0; item < items.length; item++){
      const itemAmount = items[item].querySelector('.expense-amount');
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".");
      value = parseFloat(value);
      if(isNaN(value)){
        return alert('Não foi possível calcular o total. O valor não parece ser um número');        
      }

      total += Number(value);
    }

    const symbolBRL = document.createElement('small');
    symbolBRL.textContent = 'R$';

    total = formatCurrencyBRL(total).toUpperCase().replace('R$', '');

    expensesTotal.innerHTML = '';
    expensesTotal.append(symbolBRL, total);
    
  } catch (error) {
    console.log(error);
    alert('Não foi possível atualizar os totais.');
  }
}

//Evento que caputura o clique nos itens da lista
expenseList.addEventListener('click', function (event){
  if(event.target.classList.contains('remove-icon')){
    console.log(event);
  }
})
export function analyzeExpenses(expenses=[]){
  const totalExpenses = expenses.reduce((s,e)=>s + (e.amount||0),0);
  const income = 0;
  const balance = income - totalExpenses;
  const avg = expenses.length ? totalExpenses/expenses.length : 0;
  return { totalExpenses, balance, count: expenses.length, avg };
}

export function summarizeByCategory(expenses=[]){
  return expenses.reduce((acc,e)=>{ acc[e.category] = (acc[e.category]||0) + (e.amount||0); return acc; }, {});
}
// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>Welcome to the budget tracker app!</p>
  </div>
);

const BudgetTracker = () => {
  const [salary, setSalary] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [commitments, setCommitments] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [commitmentName, setCommitmentName] = useState("");
  const [commitmentAmount, setCommitmentAmount] = useState(0);
  const [editIndex, setEditIndex] = useState(null);

  const addExpense = () => {
    if (editIndex !== null) {
      // If editing, update the expense at the editIndex
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = { name: expenseName, amount: expenseAmount };
      setExpenses(updatedExpenses);
      setEditIndex(null);
    } else {
      // If not editing, add a new expense
      setExpenses([...expenses, { name: expenseName, amount: expenseAmount }]);
    }

    // Reset input fields
    setExpenseName("");
    setExpenseAmount(0);
  };

  const editExpense = (index) => {
    // Populate input fields with the selected expense for editing
    setExpenseName(expenses[index].name);
    setExpenseAmount(expenses[index].amount);
    setEditIndex(index);
  };

  const deleteExpense = (index) => {
    const newExpenses = [...expenses];
    newExpenses.splice(index, 1);
    setExpenses(newExpenses);
  };

  const addCommitment = () => {
    if (editIndex !== null) {
      // If editing, update the commitment at the editIndex
      const updatedCommitments = [...commitments];
      updatedCommitments[editIndex] = {
        name: commitmentName,
        amount: commitmentAmount,
      };
      setCommitments(updatedCommitments);
      setEditIndex(null);
    } else {
      // If not editing, add a new commitment
      setCommitments([
        ...commitments,
        { name: commitmentName, amount: commitmentAmount },
      ]);
    }

    // Reset input fields
    setCommitmentName("");
    setCommitmentAmount(0);
  };

  const editCommitment = (index) => {
    // Populate input fields with the selected commitment for editing
    setCommitmentName(commitments[index].name);
    setCommitmentAmount(commitments[index].amount);
    setEditIndex(index);
  };

  const deleteCommitment = (index) => {
    const newCommitments = [...commitments];
    newCommitments.splice(index, 1);
    setCommitments(newCommitments);
  };

  const calculateBalance = () => {
    const totalExpenses = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    const totalCommitments = commitments.reduce(
      (acc, commitment) => acc + commitment.amount,
      0
    );
    return salary - totalExpenses - totalCommitments;
  };

  return (
    <div className="flex gap-2 flex-col md:w-2/3 mx-auto font-mono text-center">
      {/*<h2 className="text-center text-3xl font-bold my-3">Budget Tracker</h2>*/}
      <div className="bg-orange-400 p-4 rounded-lg shadow-lg">
        <label className="font-bold text-2xl">
          <h3 className="font-bold text-2xl ">Income:</h3> <br />
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="rounded-lg shadow-lg"
          />
        </label>
      </div>
      <div className="bg-lime-200 p-4 rounded-lg shadow-lg">
        <h3 className="font-bold text-2xl ">Expenses</h3> <br />
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              {expense.name}: ${expense.amount}
              <button
                className="bg-yellow-400 font-bold rounded mx-2 my-2 px-4 py-1"
                onClick={() => editExpense(index)}
              >
                Edit
              </button>
              <button
                className="bg-red-400 font-bold rounded mx-2 my-2 px-4 py-1"
                onClick={() => deleteExpense(index)}
              >
                Delete
              </button>
              <hr />
            </li>
          ))}
        </ul>
        <label className="font-bold">
          Expense Name: <br />
          <input
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            className="rounded-lg shadow-lg"
          />
          <br />
        </label>
        <label className="font-bold">
          Expense Amount: <br />
          <input
            className="rounded-lg shadow-lg"
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(Number(e.target.value))}
          />
        </label>
        <br />
        <br />
        <button
          className="bg-blue-400 font-bold rounded mx-2 px-4 py-2"
          onClick={addExpense}
        >
          Save Expense
        </button>
      </div>
      <div className="bg-blue-200 p-4 rounded-lg shadow-lg">
        <h3 className="font-bold text-2xl ">Commitments</h3> <br />
        <ul>
          {commitments.map((commitment, index) => (
            <li key={index}>
              {commitment.name}: ${commitment.amount}
              <button
                className="bg-yellow-400 font-bold rounded mx-2 my-2 px-4 py-1"
                onClick={() => editCommitment(index)}
              >
                Edit
              </button>
              <button
                className="bg-red-400 font-bold rounded mx-2 my-2 px-4 py-1"
                onClick={() => deleteCommitment(index)}
              >
                Delete
              </button>
              <hr />
            </li>
          ))}
        </ul>
        <label className="font-bold ">
          Commitment Name: <br />
          <input
            type="text"
            value={commitmentName}
            onChange={(e) => setCommitmentName(e.target.value)}
          />
          <br />
        </label>
        <label className="font-bold">
          Commitment Amount: <br />
          <input
            className="rounded-lg shadow-lg"
            type="number"
            value={commitmentAmount}
            onChange={(e) => setCommitmentAmount(Number(e.target.value))}
          />
        </label>
        <br />
        <br />
        <button
          className="bg-blue-400 font-bold rounded mx-2 px-4 py-2"
          onClick={addCommitment}
        >
          Save Commitment
        </button>
      </div>
      <div className="bg-green-300 p-4 rounded-lg shadow-lg mb-4">
        <h3 className="font-bold text-2xl">Balance: ${calculateBalance()}</h3>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/budget">Budget Tracker</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/budget" element={<BudgetTracker />} />
      </Routes>
    </div>
  </Router>
);

export default App;

import TransactionForm from "../Components/TransactionFrom.js";
import TransactionList from "../Components/TransactionList.js";
import TransactionChart from "../Components/TransactionChart.js";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Home() {
  const [transaction, setTransaction] = useState([]);
  const [editTransaction, setEditTransaction] = useState([]);

  useEffect(() => {
    fetchTransaction();
  }, []);

  async function fetchTransaction() {
    const token = Cookies.get("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await res.json();
    setTransaction(data);
  }

  return (
    <Container>
      <TransactionChart data={transaction} />

      <TransactionForm
        fetchTransaction={fetchTransaction}
        editTransaction={editTransaction}
      />

      <TransactionList
        data={transaction}
        fetchTransaction={fetchTransaction}
        setEditTransaction={setEditTransaction}
      />
    </Container>
  );
}

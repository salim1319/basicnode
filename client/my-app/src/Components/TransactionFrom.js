import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const IntialForm = {
  amount: 0,
  description: "",
  date: new Date(),
  category_id: "",
  type: "express",
};

export default function TransactionForm({ fetchTransaction, editTransaction }) {
  const { categories } = useSelector((state) => state.auth.user);

  const token = Cookies.get("token");
  const [form, setForm] = useState(IntialForm);
  const types = ["expenses", "income", "transfer"];

  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      setForm(editTransaction);
    }
  }, [editTransaction]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    editTransaction.amount === undefined ? create() : update();
  }

  function reload(res) {
    if (res.ok) {
      setForm(IntialForm);
      fetchTransaction();
    }
  }

  async function create() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    reload(res);
  }

  async function update() {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    reload(res);
  }
  function getCategoryNameById() {
    return (
      categories.find((category) => category._id === form.category_id) ?? ""
    );
  }
  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6">Add New Transaction</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex" }}>
          <Autocomplete
            value={form.type}
            onChange={(event, newValue) => {
              setForm({ ...form, type: newValue });
            }}
            id="type"
            options={types}
            sx={{ width: 200, marginRight: 5 }}
            renderInput={(params) => (
              <TextField {...params} size="small" label="type" />
            )}
          />

          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Amount"
            type="number"
            size="small"
            name="amount"
            variant="outlined"
            value={form.amount}
            onChange={handleChange}
          />
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Description"
            size="small"
            name="description"
            variant="outlined"
            value={form.description}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label=" Transaction Date"
              inputFormat="MM/DD/YYYY"
              value={form.date}
              onChange={handleDate}
              renderInput={(params) => (
                <TextField sx={{ marginRight: 5 }} size="small" {...params} />
              )}
            />
          </LocalizationProvider>

          <Autocomplete
            value={getCategoryNameById()}
            onChange={(event, newValue) => {
              setForm({ ...form, category_id: newValue._id });
            }}
            id="controllable-states-demo"
            options={categories}
            sx={{ width: 200, marginRight: 5 }}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Category" />
            )}
          />

          {editTransaction.amount !== undefined && (
            <Button type="submit" variant="secondary">
              Update
            </Button>
          )}
          {editTransaction.amount === undefined && (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

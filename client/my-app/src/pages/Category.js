import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import IconButton from "@mui/material/IconButton";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import CategoryForm from "../Components/CategoryForm.js";
import { setUser } from "../Store/auth.js";

export default function Category() {
  const token = Cookies.get("token");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [editCategory, setEditCategory] = React.useState({});

  function setEdit(category) {
    setEditCategory(category);
  }

  async function remove(id) {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const _user = {
        ...user,
        categories: user.categories.filter((cat) => cat._id != id),
      };
      dispatch(setUser({ user: _user }));
    }
  }
  return (
    <Container>
      <CategoryForm editCategory={editCategory} />
      <Typography variant="h6" sx={{ marginTop: 10 }}>
        List of Categories
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Label</TableCell>
              <TableCell align="center">Icon</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.categories.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.label}
                </TableCell>
                <TableCell align="center">{row.icon}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    component="label"
                    onClick={() => setEdit(row)}
                  >
                    <EditSharpIcon />
                  </IconButton>

                  <IconButton
                    color="warning"
                    component="label"
                    onClick={() => remove(row._id)}
                  >
                    <DeleteSharpIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import TransitionGroup from "react-transition-group/TransitionGroup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useUser } from "../auth/useUser";
import { Typography } from "@mui/material";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const PersonalTodo = () => {
  const user = useUser();
  const { id } = user;
  console.log(user);
  const [todoVal, setTodoVal] = useState("");
  //   const [groupProps, setGroupProps] = useState({
  //     appear: false,
  //     enter: true,
  //     exit: true,
  //   });
  const groupProps = {
    appear: false,
    enter: true,
    exit: true,
  };
  const [todoItem, setTodoItem] = useState("");

  const handleChange = (event) => {
    // const newTodo = {
    //   todoId: new Date().getTime(),
    //   text: event.target.value,
    // };
    setTodoVal(event.target.value);
  };

  const addTodo = async (text) => {
    const newTodo = {
      todoId: new Date().getTime(),
      text,
    };
    const response = await axios.post(`/api/todos/${id}`, {
      todos: newTodo,
    });
    //const { todos } = response.data;
    const currentTodos = response.data;
    setTodoVal("");
  };

  // useEffect(() => {
  //   addTodo();
  // }, []);

  const getTodosFromDb = async () => {
    const response = await axios.get(`/api/todos/${id}`);

    const { todos } = response.data;

    setTodoItem(todos);
  };
  const remove = async (todoId) => {
    // let filteredTodo = todoItem.filter(
    //   (tobeRemoved) => tobeRemoved.todoId !== item.todoId
    // );

    // setTodoItem([...filteredTodo]);
    const response = await axios.put(`/api/todos/${id}`, { todoId });
    console.log(response.data);
  };

  // useEffect(() => {
  //   remove()
  // }, [addTodo]);

  useEffect(() => {
    getTodosFromDb();
  }, []);

  return (
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
      }}
    >
      <Box component="form" sx={{ marginTop: "2rem" }}>
        <Stack spacing={2} direction="row">
          <TextField
            fullWidth
            label="Your todo's"
            id="fullWidth"
            value={todoVal.text}
            onChange={handleChange}
          />
          <Button variant="outlined" onClick={() => addTodo(todoVal)}>
            Add
          </Button>
          <Button
            sx={{ float: "right" }}
            onClick={() => localStorage.removeItem("token")}
          >
            Logout
          </Button>
        </Stack>
      </Box>

      <Stack sx={{ marginTop: "1rem" }}>
        <TransitionGroup {...groupProps}>
          {todoItem &&
            todoItem.map((item, key) => (
              <Fade key={key} collapse bottom>
                <Item>
                  {item.text}{" "}
                  <Button onClick={() => remove(item.todoId)}>X</Button>
                </Item>
              </Fade>
            ))}
        </TransitionGroup>
      </Stack>
    </Box>
  );
};

export default PersonalTodo;

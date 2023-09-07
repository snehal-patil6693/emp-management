const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body
app.use(fileUpload());

app.post("/file/upload", (req, res) => {
  const filename = Date.now() + "_" + req.files.file.name;
  const file = req.files.screenshot;
  let uploadPath = __dirname + "/uploads/" + filename;
  file.mv(uploadPath, (err) => {
    if (err) {
      return res.send(Err);
    }
  });
  res.send(200);
});

//ROUTES//

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO admin (name, email, role, password) VALUES($1,$2,$3,$4) RETURNING *",
      [name, email, role, password]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/emp", async (req, res) => {
  try {
    const { name, email, date } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO emp (name, email, date) VALUES($1,$2,$3) RETURNING *",
      [name, email, date]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/file", async (req, res) => {
  try {
    const { file, date, name } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO file (file, date, name) VALUES($1,$2,$3) RETURNING *",
      [file, date, name]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM admin");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/emp", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM emp");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/file", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM file");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM admin WHERE id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/emp/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM emp WHERE id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/file/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM file WHERE id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { email } = req.body;
    const { role } = req.body;
    const { password } = req.body;
    const updateTodo = await pool.query(
      "UPDATE admin SET name = $1, email=$2, role=$3, password=$4 WHERE id = $5",
      [name,email,role,password, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/emp/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { email } = req.body;
    const { date } = req.body;
    
    const updateTodo = await pool.query(
      "UPDATE emp SET name = $1, email=$2, date=$3 WHERE id = $4",
      [name,email,date, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/file/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { file } = req.body;
    const { date } = req.body;
    
        const updateTodo = await pool.query(
      "UPDATE file SET file = $1, date=$2, name=$3 WHERE id = $4",
      [file,date,name, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM admin WHERE id = $1", [
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/emp/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM emp WHERE id = $1", [
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/file/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM file WHERE id = $1", [
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5001, () => {
  console.log("server has started on port 5001");
});       
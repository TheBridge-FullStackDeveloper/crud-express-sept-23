const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
const members = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    status: "active",
  },
  {
    id: 2,
    name: "Bob Williams",
    email: "bob@gmail.com",
    status: "inactive",
  },
  {
    id: 3,
    name: "Shannon Jackson",
    email: "shannon@gmail.com",
    status: "active",
  },
];
  
  
app.get("/", (req, res) => {
  res.send({msg:"Aquí tienes los miembros",members});
});

app.get("/:id", (req, res) => {
  const found = members.some((member) => member.id == req.params.id);
  //   found
  //     ? res.send(members.filter((member) => member.id == req.params.id))
  //     : res.send(`Member with id: ${req.params.id} not found`);
  if (found) {
    res.send(members.filter((member) => member.id == req.params.id));
  } else {
    res.send(`Member with id: ${req.params.id} not found`);
  }
});

app.post("/", (req, res) => {
  const newMember = {
    id: members.length + 1,
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  members.push(newMember);
  res.status(201).send(members);
});

app.put("/:id", (req, res) => {
  const found = members.some((member) => member.id == req.params.id);
  if (found) {
    members.forEach((member) => {
      if (member.id == req.params.id) {
        member.name = req.body.name;
        member.email = req.body.email;
      }
    });
    res.send(members);
  } else {
    res.status(404).send(`No esta. anda pasha bobo con id ${req.params.id}`);
  }
});

app.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id == req.params.id);
  if (found) {
    res.send(members.filter((member) => member.id != req.params.id));
  }else{
    res.status(404).send(`No esta. anda pasha bobo con id ${req.params.id}`);
  }
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

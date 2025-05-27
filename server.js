import express from "express";
import cors from "cors";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

// Criar um usuário
app.post("/usuario", async (req, res) => {
  try {
    const novoUsuario = await prisma.user.create({
      data: {
        nome: req.body.nome,
        email: req.body.email,
        createdAt: req.body.createdAt,
      },
    });
    res.status(201).json(novoUsuario);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao criar usuário", detalhes: error.message });
  }
});

// Criar uma task
app.post("/tasks", async (req, res) => {
  try {
    const novaTask = await prisma.task.create({
      data: {
        numeroTask: req.body.numeroTask,
        descricaoTask: req.body.descricaoTask,
        sprintTask: req.body.sprintTask,
        dataInicioTask: req.body.dataInicioTask,
        dataTerminoTask: req.body.dataTerminoTask,
        prazoTerminoTask: req.body.prazoTerminoTask,
        aceTask: req.body.aceTask,
        aprendizadoTask: req.body.aprendizadoTask,
        dificuldadeTask: req.body.dificuldadeTask,
        comentariosTask: req.body.comentariosTask,
      },
    });
    res.status(201).json(novaTask);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao criar task", detalhes: error.message });
  }
});

// Obter todos os usuários
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await prisma.user.findMany();
    res.json(usuarios);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar usuários", detalhes: error.message });
  }
});

// Obter todas as tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar tasks", detalhes: error.message });
  }
});

// Deletar uma task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const taskDeletada = await prisma.task.delete({
      where: { id },
    });
    res.json(taskDeletada);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao deletar task", detalhes: error.message });
  }
});

app.listen(4000, () => {
  console.log("Servidor rodando na porta 4000!");
});

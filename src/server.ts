import express from "express";

const app = express()
app.use(express.json())

app.listen(3333, () => {
    console.log("API está rodando na porta 3333")
})
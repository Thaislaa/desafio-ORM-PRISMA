import express from "express";
import { JogoRepository } from "./repositories/jogo.repository.js";
import { handleError } from "./config/error.handler.js";

const app = express()
app.use(express.json())

const jogoRepository = new JogoRepository()

// -------- JOGOS --------

// LISTAR JOGOS
app.get("/jogos", async (req, res) => {
    try {
        const jogos = await jogoRepository.listar()
        return res.status(200).send({
            ok: true,
            message: "Jogos listados com sucesso",
            data: jogos
        })
    } catch (error) {
        return handleError(error, res)
    }
})

// CRIAR JOGO
app.post("/jogos", async (req, res) => {
    try {
        const { nome, genero, tamanho, preco, dtLancamento, multiplayer } = req.body

        if (!nome || !genero || !dtLancamento || multiplayer === undefined || tamanho === undefined || preco === undefined) {
            return res.status(400).send({
                ok: false,
                message: "Campos não foram informados corretamente"
            })
        }

        const jogo = await jogoRepository.criar({
            nome,
            genero,
            tamanho,
            preco,
            multiplayer,
            dtLancamento: new Date(dtLancamento)
        })
        return res.status(201).send({
            ok: true,
            message: "Jogo criado com sucesso",
            data: jogo
        })
    } catch (error) {
        return handleError(error, res)
    }
})

// ATUALIZAR JOGO
app.put("/jogos/:idJogo", async (req, res) => {
    try {
        const { idJogo } = req.params
        const { nome, genero, tamanho, preco, dtLancamento, multiplayer } = req.body

        if (!nome && !genero && !dtLancamento && multiplayer === undefined && tamanho === undefined && preco === undefined) {
            return res.status(400).send({
                ok: false,
                message: "Informe pelo menos um campo"
            })
        }

        const encontrado = await jogoRepository.obterPorId(idJogo)
        if (!encontrado) {
            return res.status(404).send({
                ok: false,
                message: "Jogo não encontrado"
            })
        }

        const jogo = await jogoRepository.atualizar(idJogo, {
            ...req.body,
            dtLancamento: dtLancamento ? new Date(dtLancamento) : undefined
        })

        return res.status(200).send({
            ok: true,
            message: "Jogo atualizado com sucesso",
            data: jogo
        })
    } catch (error) {
        return handleError(error, res)
    }
})

// DELETAR JOGO
app.delete("/jogos/:idJogo", async (req, res) => {
    try {
        const { idJogo } = req.params

        const encontrado = await jogoRepository.obterPorId(idJogo)
        if (!encontrado) {
            return res.status(404).send({
                ok: false,
                message: "Jogo não encontrado"
            })
        }

        const jogo = await jogoRepository.deletar(idJogo)
        return res.status(200).send({
            ok: true,
            message: "Jogo deletado com sucesso",
            data: jogo
        })
    } catch (error) {
        return handleError(error, res)
    }
})

app.listen(3333, () => {
    console.log("API está rodando na porta 3333")
})
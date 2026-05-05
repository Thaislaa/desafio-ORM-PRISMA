import express from "express";
import { JogoRepository } from "./repositories/jogo.repository.js";
import { handleError } from "./config/error.handler.js";
import { PersonagemRepository } from "./repositories/personagem.repository.js";

const app = express()
app.use(express.json())

const jogoRepository = new JogoRepository()
const personagemRepository = new PersonagemRepository()

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

// -------- PERSONAGEM --------

// LISTAR PERSONAGEM
app.get("/personagens", async (req, res) => {
    try {
        const personagens = await personagemRepository.listar()
        return res.status(200).send({
            ok: true,
            message: "Personagens listados com sucesso",
            data: personagens
        })
    } catch (error) {
        return handleError(error, res)
    }
})

// CRIAR PERSONAGEM 
app.post("/personagens", async (req, res) => {
    try {
        const { nome, habilidades, idade, forca, inteligencia, idJogo } = req.body

        if (!nome || !habilidades || !idJogo || idade === undefined || forca === undefined || inteligencia === undefined) {
            return res.status(400).send({
                ok: false,
                message: "Campos não foram informados corretamente"
            })
        }

        const jogoEncontrado = await jogoRepository.obterPorId(idJogo)
        if (!jogoEncontrado) {
            return res.status(404).send({
                ok: false,
                message: "Jogo não encontrado"
            })
        }

        const personagem = await personagemRepository.criar({
            nome,
            habilidades,
            idade,
            forca,
            inteligencia,
            idJogo
        })

        return res.status(201).send({
            ok: true,
            message: "Personagem criado com sucesso",
            data: personagem
        })
    } catch (error) {
        return handleError(error, res)
    }
})

// ATUALIZAR PERSONAGEM 
app.put("/personagens/:idPersonagem", async (req, res) => {
    try {
        const { nome, habilidades, idade, forca, inteligencia } = req.body
        const { idPersonagem } = req.params

        if (!nome && !habilidades && idade === undefined && forca === undefined && inteligencia === undefined) {
            return res.status(400).send({
                ok: false,
                message: "Informe pelo menos um campo"
            })
        }

        const personagemEncontrado = await personagemRepository.obterPorId(idPersonagem)
        if (!personagemEncontrado) {
            return res.status(404).send({
                ok: false,
                message: "Personagem não encontrado"
            })
        }

        const personagem = await personagemRepository.atualizar(idPersonagem, {
            nome,
            habilidades,
            idade,
            forca,
            inteligencia
        })

        return res.status(200).send({
            ok: true,
            message: "Personagem atualizado com sucesso",
            data: personagem
        })
    } catch (error) {
        return handleError(error, res)
    }
})

// DELETAR PERSONAGEM
app.delete("/personagens/:idPersonagem", async (req, res) => {
    try {
        const { idPersonagem } = req.params

        const personagemEncontrado = await personagemRepository.obterPorId(idPersonagem)
        if (!personagemEncontrado) {
            return res.status(404).send({
                ok: false,
                message: "Personagem não encontrado"
            })
        }

        const personagem = await personagemRepository.deletar(idPersonagem)
        return res.status(200).send({
            ok: true,
            message: "Personagem deletado com sucesso",
            data: personagem
        })
    } catch (error) {
        return handleError(error, res)
    }
})

app.listen(3333, () => {
    console.log("API está rodando na porta 3333")
})
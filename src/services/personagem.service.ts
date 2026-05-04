import { handleError } from "../config/config.handler.js"
import type { CreateJogoPersonagemDto } from "../dtos/create-jogo-personagem.dto.js"
import { prisma } from "../lib/prisma.js"

export class PersonagemService {
    // CRIAR JOGO E PERSONAGEM
    public async criarJogoPersonagem(dados: CreateJogoPersonagemDto) {
        try {
            return await prisma.$transaction(async (tx) => {
                const jogo = await tx.jogo.create({
                    data: {
                        nome: dados.nome,
                        genero: dados.genero,
                        dtLancamento: dados.dtLancamento,
                        preco: dados.preco,
                        tamanho: dados.tamanho,
                        multiplayer: dados.multiplayer
                    }
                })

                const personagem = await tx.personagem.create({
                    data: {
                        ...dados.personagem,
                        idJogo: jogo.id
                    }
                })

                return { jogo, personagem }
            })
        } catch (error) {
            handleError(error)
        }
    }
}
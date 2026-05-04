import { AppError } from "../config/AppError.js";
import { handleError } from "../config/config.handler.js";
import type { CreateJogoPersonagemDto } from "../dtos/create-jogo-personagem.dto.js";
import type { CreatePersonagemDto } from "../dtos/create-personagem.dto.js";
import type { UpdatePersonagemDto } from "../dtos/update-personagem.dto.js";
import { prisma } from "../lib/prisma.js";
import { JogoRepository } from "./jogo.repository.js";

export class PersonagemRepository {
    // LISTAR PERSONAGENS  
    public async listar() {
        const personagens = await prisma.personagem.findMany()
        return personagens
    }

    // OBTER PERSONAGEM POR ID
    public async obterPorId(id: string) {
        const personagemEncontrado = await prisma.personagem.findUnique({
            where: {
                id
            }
        })

        if (!personagemEncontrado) {
            throw new AppError("Personagem não encontrado", 404)
        }

        return personagemEncontrado
    }

    // CRIAR PERSONAGEM
    public async criar(dados: CreatePersonagemDto) {
        try {
            const jogoRepository = new JogoRepository()
            await jogoRepository.obterPorId(dados.idJogo)

            const personagem = await prisma.personagem.create({
                data: dados
            })

            return personagem
        } catch (error) {
            return handleError(error)
        }
    }

    // ATUALIZAR PERSONAGEM 
    public async atualizar(id: string, dados: UpdatePersonagemDto) {
        try {
            await this.obterPorId(id)

            const personagem = await prisma.personagem.update({
                where: {
                    id
                },
                data: dados
            })

            return personagem
        } catch (error) {
            return handleError(error)
        }
    }

    // DELETAR PERSONAGEM
    public async deletar(id: string) {
        try {
            await this.obterPorId(id)

            const personagem = await prisma.personagem.delete({
                where: {
                    id
                }
            })

            return personagem
        } catch (error) {
            return handleError(error)
        }
    }

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

    // LISTAR PERSONAGENS COM SEUS JOGOS
    public async listarPersonagensComSeusJogos() {
        const personagem = await prisma.personagem.findMany({
            include: {
                jogo: true
            }
        })

        return personagem
    }
}
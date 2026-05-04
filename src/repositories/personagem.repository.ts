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
            throw new Error("Personagem não encontrado, verifique o id")
        }

        return personagemEncontrado
    }

    // CRIAR PERSONAGEM
    public async criar(dados: CreatePersonagemDto) {
        const jogoRepository = new JogoRepository()
        await jogoRepository.obterPorId(dados.idJogo)

        const personagem = await prisma.personagem.create({
            data: dados
        })

        return personagem
    }

    // ATUALIZAR PERSONAGEM 
    public async atualizar(id: string, dados: UpdatePersonagemDto) {
        await this.obterPorId(id)

        const personagem = await prisma.personagem.update({
            where: {
                id
            },
            data: dados
        })

        return personagem
    }

    public async deletar(id: string) {
        await this.obterPorId(id)

        const personagem = await prisma.personagem.delete({
            where: {
                id
            }
        })

        return personagem
    }
}
import type { CreateJogoDto } from "../dtos/create-jogo.dto.js";
import type { UpdateJogoDto } from "../dtos/update-jogo.dto.js";
import { prisma } from "../lib/prisma.js";

export class JogoRepository {
    // LISTAR JOGOS
    public async listar() {
        const jogos = await prisma.jogo.findMany()
        return jogos
    }

    // OBTER JOGO POR ID
    public async obterPorId(id: string) {
        const jogoEncontrado = await prisma.jogo.findUnique({
            where: {
                id
            }
        })

        if (!jogoEncontrado) {
            throw new Error("Jogo não encontrado, verifique o id")
        }

        return jogoEncontrado
    }

    // CRIAR JOGO
    public async criar(dados: CreateJogoDto) {
        const jogo = await prisma.jogo.create({
            data: dados
        })

        return jogo
    }

    // ATUALIZAR JOGO
    public async atualizar(id: string, dados: UpdateJogoDto) {
        await this.obterPorId(id)

        const jogo = await prisma.jogo.update({
            where: {
                id
            },
            data: dados
        })

        return jogo
    }

    // DELETAR JOGO
    public async deletar(id: string) {
        await this.obterPorId(id)

        const jogo = await prisma.jogo.delete({
            where: {
                id
            }
        })

        return jogo
    }
}
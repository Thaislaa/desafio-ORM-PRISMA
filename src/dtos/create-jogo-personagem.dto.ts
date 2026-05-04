import type { CreateJogoDto } from "./create-jogo.dto.js";

export interface CreateJogoPersonagemDto extends CreateJogoDto {
    personagem: {
        nome: string
        habilidades: string
        idade: number
        forca: number
        inteligencia: number
    }
}
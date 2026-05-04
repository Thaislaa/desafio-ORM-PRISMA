import { JogoRepository } from "./repositories/jogo.repository.js";
import { PersonagemRepository } from "./repositories/personagem.repository.js";
import { PersonagemService } from "./services/personagem.service.js";

const jogoRepository = new JogoRepository()
const personagemRepository = new PersonagemRepository()
const personagemService = new PersonagemService()

async function main() {
    // const listarJogos = await jogoRepository.listar();
    // console.log("LISTA DE JOGOS: ", listarJogos);

    // const criarJogo = await jogoRepository.criar({
    //     nome: "Soccer Play",
    //     genero: "Esportes",
    //     dtLancamento: new Date("2010-01-09"),
    //     preco: 120,
    //     tamanho: 70,
    //     multiplayer: true
    // })
    // console.log("JOGO CRIADO: ", criarJogo);

    // const obterJogoPorId = await jogoRepository.obterPorId("bf6bf5c0-33ef-43cd-88b4-fbb88819d205")
    // console.log("JOGO ENCONTRADO: ", obterJogoPorId);

    // const atualizarJogo = await jogoRepository.atualizar(
    //     "921f8f72-1d71-4561-985a-a3da2b255e64", {
    //     dtLancamento: new Date("2011-01-07")
    // }
    // )
    // console.log("JOGO ATUALIZADO: ", atualizarJogo)

    // const deletarJogo = await jogoRepository.deletar("bf6bf5c0-33ef-43cd-88b4-fbb88819d205")
    // console.log("JOGO DELETADO: ", deletarJogo)

    // const listarPersonagens = await personagemRepository.listar()
    // console.log(listarPersonagens);

    // const obterPersonagemPorId = await personagemRepository.obterPorId("df7e5028-8ce0-4e8d-b940-c7e139362b8b")
    // console.log(obterPersonagemPorId)

    // const criarPersonagem = await personagemRepository.criar({
    //     nome: "Arthas",
    //     habilidades: "Espada sagrada e controle de gelo",
    //     idade: 30,
    //     forca: 85,
    //     inteligencia: 70,
    //     idJogo: "fcc2f59a-b2da-4bbc-8eaf-240fe92a90ee"
    // })
    // console.log("JOGO CRIADO: ", criarPersonagem);

    // const atualizarPersonagem = await personagemRepository.atualizar(
    //     "df7e5028-8ce0-4e8d-b940-c7e139362b8b",
    //     {
    //         idade: 32,
    //         inteligencia: 75,
    //         forca: 83
    //     }
    // )
    // console.log("ATUALIZAR PERSONAGEM: ", atualizarPersonagem);

    // const deletarPersonagem = await personagemRepository.deletar("df7e5028-8ce0-4e8d-b940-c7e139362b8b")
    // console.log("PERSONAGEM DELETADO: ", deletarPersonagem);

    // const criarJogoPersonagem = await personagemService.criarJogoPersonagem({
    //     nome: "Speed Race",
    //     genero: "Corrida",
    //     dtLancamento: new Date("2021-03-15"),
    //     preco: 99,
    //     tamanho: 30,
    //     multiplayer: true,
    //     personagem: {
    //         nome: "Lucas",
    //         habilidades: "Direção avançada e reflexos rápidos",
    //         idade: 28,
    //         forca: 60,
    //         inteligencia: 75,
    //     }
    // })
    // console.log("JOGO E PERSONAGEM CRIADO: ", criarJogoPersonagem);

    // const listarPersonagensJogos = await personagemRepository.listarPersonagensComSeusJogos();
    // console.log(listarPersonagensJogos);
}

main()
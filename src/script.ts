import { JogoRepository } from "./repositories/jogo.repository.js";

const jogoRepository = new JogoRepository()

async function main() {
    const listarJogos = await jogoRepository.listar();
    console.log("LISTA DE JOGOS: ", listarJogos);

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

    const deletarJogo = await jogoRepository.deletar("bf6bf5c0-33ef-43cd-88b4-fbb88819d205")
    console.log("JOGO DELETADO: ", deletarJogo)
}

main()
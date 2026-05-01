-- CreateTable
CREATE TABLE "jogo" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "genero" VARCHAR(60) NOT NULL,
    "dt_lancamento" TIMESTAMP(3) NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "tamanho" INTEGER NOT NULL,
    "multiplayer" BOOLEAN NOT NULL,

    CONSTRAINT "jogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personagem" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "habilidades" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "forca" INTEGER NOT NULL,
    "inteligencia" INTEGER NOT NULL,
    "idJogo" UUID NOT NULL,

    CONSTRAINT "personagem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "personagem" ADD CONSTRAINT "personagem_idJogo_fkey" FOREIGN KEY ("idJogo") REFERENCES "jogo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

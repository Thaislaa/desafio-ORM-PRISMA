import { AppError } from "./AppError.js";

export function handleError(error: any): never {
    if (error instanceof AppError) {
        throw error;
    }

    if (error && typeof error === "object" && "code" in error) {
        switch ((error as any).code) {
            case "P2002":
                throw new AppError("Registro duplicado", 400);

            case "P2025":
                throw new AppError("Registro não encontrado", 404);

            case "P2003":
                throw new AppError("Violação de relacionamento", 400);
        }
    }

    if (error instanceof Error) {
        throw new AppError(error.message, 500);
    }

    throw new AppError("Erro desconhecido", 500);
}
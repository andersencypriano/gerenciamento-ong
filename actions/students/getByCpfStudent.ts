import { prisma } from "@/lib/prisma";

export default async function getByCpfStudent(cpf: string) {
    try {
        const student = await prisma.student.findUnique({
            where: {
                cpf,
            },
        });
        return student;
    } catch (error) {
        console.error("Erro ao buscar estudante:", error);
        return null;
    }
}
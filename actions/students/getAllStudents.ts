import { prisma } from "@/lib/prisma";

export async function getAllStudents() {
  try {
    const students = await prisma.student.findMany({
      include: {
        workshops: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return students;
  } catch (error) {
    console.error("Erro ao buscar estudantes:", error);
    return [];
  }
}
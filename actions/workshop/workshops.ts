"use server"

import { prisma } from "@/lib/prisma";

export async function getAllWorkshops() {
  try {
    const workshops = await prisma.workshop.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return workshops;
  } catch (error) {
    console.error("Erro ao buscar oficinas:", error);
    return [];
  }
}

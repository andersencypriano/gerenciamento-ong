"use client"
import { useState } from "react" // Importe o useState
import { Button } from "@/components/ui/button"

export default function Page() {
  // 1. Crie um estado para armazenar os dados recebidos
  const [data, setData] = useState<{ name: string; idade: number } | null>(null)

  async function createPost(formData: FormData) {
    const response = await fetch("/api/routehandler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.get("name"),
        idade: formData.get("idade")
      })
    })
    const result = await response.json()

    if (response.ok) {
      setData(result.data) // Aqui pegamos o campo 'data' que sua API retorna
      console.log("Resposta da API:", result)
    }
    if (!response.ok) {
      throw new Error(result.error)
    }
  }
  return (
    <div className="p-8 flex flex-col gap-6 max-w-sm">
      <form action={createPost} className="flex flex-col gap-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border p-2 rounded text-black"
        />
        <input
          type="text"
          name="post"
          placeholder="Post"
          className="border p-2 rounded text-black"
        />
        <Button type="submit">Cadastrar</Button>
      </form>
      {/* 3. Renderize os dados na tela se eles existirem */}
      {data && (
        <div className="mt-4 p-4 border rounded bg-slate-50 text-black">
          <h2 className="font-bold underline text-lg">Dados Cadastrados:</h2>
          <p><strong>Mensagem:</strong> { }</p>
          <p><strong>Nome:</strong> {data.name}</p>
          <p><strong>Idade:</strong> {data.idade}</p>
        </div>
      )}
    </div>
  )
}
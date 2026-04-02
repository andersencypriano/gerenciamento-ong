import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get("name")
  
  return NextResponse.json({ name })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log(body)
    // IMPORTANTE: Devolva o body dentro de um campo chamado 'data'
    // para que o seu frontend consiga ler em result.data
    return NextResponse.json({ 
      message: "Dados recebidos com sucesso", 
      data: body 
    })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Erro ao processar JSON" }, { status: 400 })
  }
}
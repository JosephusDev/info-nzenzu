import { createSession } from '@/lib/session'
import { useCreateSubscriber } from '@/models/Subscribers/useCreateSubscriber'
import { subscriberSchema } from '@/types/schema'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body: subscriberSchema = await req.json()

    if (!body.email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 },
      )
    }

    const data = await useCreateSubscriber(body)

    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    )
  }
}

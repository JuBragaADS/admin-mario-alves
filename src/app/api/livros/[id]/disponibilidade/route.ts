import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client/extension';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const livroId = parseInt(id);
  const { searchParams } = new URL(request.url);
  const dataReserva = searchParams.get('data');

  if (!livroId || !dataReserva) {
    return NextResponse.json(
      { error: 'ID do livro e data da reserva são obrigatórios' },
      { status: 400 }
    );
  }

  try {
    const dataReservaISO = new Date(dataReserva);

    const emprestimoExistente = await prisma.emprestimo.findFirst({
      where: {
        livroId: livroId,
        AND: [
          {
            datadaReserva: {
              lte: dataReservaISO,
            },
          },
          {
            datadaEntrega: {
              gt: dataReservaISO,
            },
          },
        ],
      },
    });

    const isDisponivel = emprestimoExistente === null;

    return NextResponse.json({ isDisponivel });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro interno ao verificar disponibilidade' },
      { status: 500 }
    );
  }
}

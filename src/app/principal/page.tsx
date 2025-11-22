"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface geralDadosI {
  usuarios: number;
  livros: number;
  reservas: number;
  emprestimos: number;
}

export default function Principal() {
  const [dados, setDados] = useState<geralDadosI>({} as geralDadosI);

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/gerais`);
      const dados = await response.json();
      setDados(dados);
    }
    getDadosGerais();
  }, []);

  const cores = [
    "red",
    "blue",
    "violet",
    "green",
  ];

  return (
    <div className="container mt-24 mx-auto p-4">
  
  <h3 className="text-3xl mb-4 font-bold">Atividades:</h3>

  <div className="mt-16">
    <div className="w-2/3 flex justify-between mx-auto mb-5">
      <div className="border-blue-400 border rounded p-6 w-1/3 me-3">
        <span className="bg-blue-100 text-blue-400 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-blue-300 dark:text-blue-300">
          {dados.usuarios}
        </span>
        <Link href="/principal/usuarios">
          <p className="font-bold mt-2 text-center">Usuários</p>
        </Link>
      </div>
      <div className="border-red-600 border rounded p-6 w-1/3 me-3">
        <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-red-300">
          {dados.livros}
        </span>
        <Link href="/principal/livros">
          <p className="font-bold mt-2 text-center">Livros</p>
        </Link>
      </div>
      <div className="border-purple-600 border rounded p-6 w-1/3 me-3">
        <span className="bg-purple-200 text-purple-500 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-purple-500 dark:text-purple-500">
          {dados.reservas}
        </span>
        <Link href="/minha_pagina">
          <p className="font-bold mt-2 text-center">Reservas</p>
        </Link>
      </div>
      <div className="border-green-600 border rounded p-6 w-1/3">
        <span className="bg-green-100 text-green-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-green-900 dark:text-green-300">
          {dados.emprestimos}
        </span>
        <Link href="/principal/emprestimos">
          <p className="font-bold mt-2 text-center">Empréstimo</p>
        </Link>
      </div>
    </div>
  </div>
</div>
  );
}

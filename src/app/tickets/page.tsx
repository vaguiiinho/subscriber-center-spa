'use client';
import { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';

export default function Page() {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      qtype: 'fn_areceber.id_cliente',
      query: '14149',
    }),
  };

  const [tickets, setTickets] = useState<{ registros?: any[] }>({});

  useEffect(() => {
    const getTickets = async () => {
      try {
        const response = await fetch('/api/tickets', options);
        const data = await response.json();
        if (data) {
          setTickets(data);
        }
      } catch (error) {
        console.error('Erro ao buscar tickets:', error);
      }
    };
    getTickets();
  }, []);

  return (
    <div className="flex flex-col items-center mt-10 px-20">
      {
        tickets?.registros ? (
          <table className="w-full   border-collapse border border-gray-600 rounded-lg shadow">
            <thead>
              <tr className="bg-gray-[550]">
                <th className="p-4 border-b">ID</th>
                <th className="p-4 border-b">Valor</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {tickets.registros.map((fatura: any) => (
                <tr key={fatura.id} className="bg-white text-slate-950 even:bg-gray-50">
                  <td className="p-4 text-center border-b">{fatura.id}</td>
                  <td className="p-4 text-center border-b">{fatura.valor}</td>
                  <td className="p-4 text-center border-b">
                    <span
                      className={`py-1 px-3 rounded-full text-sm font-medium 
                    ${fatura.status === "R" ? "bg-green-100 text-green-700" :
                          fatura.status === "C" ? "bg-red-100 text-red-700" :
                            "bg-yellow-100 text-yellow-700"}`}
                    >
                      {fatura.status === "R" ? "Recebido" : fatura.status === "C" ? "Cancelado" : "Aberto"}
                    </span>
                  </td>
                  <td className="p-4 text-center border-b">
                    <div className="flex justify-center space-x-2">
                      {/* <ButtonTicketViwe /> */}
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none flex items-center space-x-1">
                        <FaDownload />
                        <span>Download</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>Carregando ...</div>
        )
      }
    </div>
  );
}

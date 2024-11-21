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
      qtype: 'cliente_contrato.id',
      query: '14149',
    }),
  };

  const [contracts, setContracts] = useState<{ registros?: any[] }>({});

  useEffect(() => {
    const getContracts = async () => {
      try {
        const response = await fetch('/api/contracts', options);
        const data = await response.json();
        if (data) {
          setContracts(data);
        }
      } catch (error) {
        console.error('Erro ao buscar contracts:', error);
      }
    };
    getContracts();
  }, []);

  return (
    <div className="flex flex-col items-center mt-10 px-20">
      {
        contracts?.registros ? (
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
              {contracts.registros.map((contract: any) => (
                <tr key={contract.id} className="bg-white text-slate-950 even:bg-gray-50">
                  <td className="p-4 text-center border-b">{contract.id}</td>
                  <td className="p-4 text-center border-b">{contract.valor}</td>
                  <td className="p-4 text-center border-b">
                    <span
                      className={`py-1 px-3 rounded-full text-sm font-medium 
                    ${contract.status === "R" ? "bg-green-100 text-green-700" :
                          contract.status === "C" ? "bg-red-100 text-red-700" :
                            "bg-yellow-100 text-yellow-700"}`}
                    >
                      {contract.status === "R" ? "Recebido" : contract.status === "C" ? "Cancelado" : "Aberto"}
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

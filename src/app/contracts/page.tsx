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
        console.log(data)
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
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b">Status Internet</th>
                <th className="p-4 border-b">Data de renovação</th>
                {/* <th className="p-4 border-b">Ações</th> */}
              </tr>
            </thead>
            <tbody>
              {contracts.registros.map((contract: any) => (
                <tr key={contract.id} className="bg-white text-slate-950 even:bg-gray-50">
                  <td className="p-4 text-center border-b">{contract.id}</td>
                  <td className="p-4 text-center border-b">
                    <span
                      className={`py-1 px-3 rounded-full text-sm font-medium
                        ${contract.status === "P" ? "bg-blue-100 text-blue-700" :
                          contract.status === "A" ? "bg-green-100 text-green-700" :
                            contract.status === "I" ? "bg-gray-100 text-gray-700" :
                              contract.status === "N" ? "bg-yellow-100 text-yellow-700" :
                                "bg-red-100 text-red-700"}`}
                    >
                      {contract.status === "P" ? "Pré-contrato" :
                        contract.status === "A" ? "Ativo" :
                          contract.status === "I" ? "Inativo" :
                            contract.status === "N" ? "Negativado" : "Desistiu"}
                    </span>
                  </td>
                  <td className="p-4 text-center border-b">
                    <span
                      className={`py-1 px-3 rounded-full text-sm font-medium 
                        ${contract.status_internet === "A" ? "bg-green-100 text-green-700" :
                          contract.status_internet === "D" ? "bg-gray-100 text-gray-700" :
                            contract.status_internet === "CM" ? "bg-orange-100 text-orange-700" :
                              contract.status_internet === "CA" ? "bg-red-100 text-red-700" :
                                contract.status_internet === "FA" ? "bg-yellow-100 text-yellow-700" :
                                  "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {contract.status_internet === "A" ? "Ativo" :
                        contract.status_internet === "D" ? "Desativado" :
                          contract.status_internet === "CM" ? "Bloqueio Manual" :
                            contract.status_internet === "CA" ? "Bloqueio Automático" :
                              contract.status_internet === "FA" ? "Financeiro em atraso" :
                                contract.status_internet === "AA" ? "Aguardando Assinatura" :
                                  "Status Desconhecido"}
                    </span>
                  </td>
                  <td className="p-4 text-center border-b">{contract.data_renovacao}</td>
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

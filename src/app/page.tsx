import { FaDownload } from "react-icons/fa";

export default async function Page() {
  const url = 'url';
  const token = 'token';
  let options = {
    method: 'POST', // Mudei para POST, caso a API suporte
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(token),
      ixcsoft: 'listar',
    },
    body: JSON.stringify({
      qtype: "fn_areceber.id_cliente",
      query: "14149"
    }),
  };

  let data = await fetch(url, options);

  // Verifique se a resposta foi bem-sucedida
  if (!data.ok) {
    throw new Error(`Erro ${data.status}: ${data.statusText}`);
  }

  // Para usar a resposta JSON:
  let faturas = await data.json();

  return (
    <main className="flex flex-col items-center mt-10">
      {faturas.registros.map((fatura: any) => (
        <ul key={fatura.id} className="w-full max-w-md mb-4 border border-gray-200 rounded-lg shadow">
          <li className="p-4 bg-white flex flex-col space-y-2 rounded-md">
            <div className="flex items-center justify-between space-x-4">
              <span className="text-lg font-semibold">ID: {fatura.id}</span>
              <span className="text-gray-700">Valor: {fatura.valor}</span>
              <span
                className={`py-1 px-3 rounded-full text-sm font-medium 
                  ${fatura.status === "R" ? "bg-green-100 text-green-700" : 
                  fatura.status === "C" ? "bg-red-100 text-red-700" : 
                  "bg-yellow-100 text-yellow-700"}`}
              >
                Status: {fatura.status === "R" ? "Recebido" : fatura.status === "C" ? "Cancelado" : "Aberto"}
              </span>
            </div>

            <div className="flex space-x-4 mt-3">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
                Visualizar
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none flex items-center space-x-1">
                <FaDownload /> {/* Ícone de download */}
                <span>Download</span>
              </button>
            </div>
          </li>
        </ul>
      ))}
    </main>
  );
}

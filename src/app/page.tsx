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
      query: "id"
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
    <main>
      {faturas.registros.map((fatura: any) => (
        <ul key={fatura.id}>
          <li>id: {fatura.id} valor: {fatura.valor}</li>
        </ul>
      ))}
    </main>
  );
}

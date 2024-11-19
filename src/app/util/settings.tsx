export async function getTicket()
{
  const url = 'url';
  const token = 'token';
  let options = {
    method: 'POST', // Mudei para POST, caso a API suporte
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(token),
      // ixcsoft: 'listar',
    },
    body: JSON.stringify({
      boletos: "1173440",
      juro: "N",
      multa: "N",
      atualiza_boleto: "N",
      tipo_boleto: "arquivo",
      base64: "N"
    }),
  };



  const response = await fetch(url, options);
  if (!response.ok || response.headers.get("Content-Type") !== "application/pdf") {
    throw new Error("Erro ao buscar o PDF ou formato inválido.");
  }

  return response
}

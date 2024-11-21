const base_url = 'https://crm.tubaron.net/webservice/v1'
const token = '44:82225522c68ce028c0652e38ccbade6ac43df33110853ec131ad1797aa1db656'

export async function getTicket() {
  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(token),
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

  try {
      const response = await fetch(`${base_url}/get_boleto`, options);

      if (!response.ok) {
          console.error(`Erro: ${response.status} - ${response.statusText}`);
          return;
      }

      const blob = await response.blob();

      console.log("Blob recebido:", blob);

      if (blob.size === 0) {
          console.error("O blob está vazio");
          return;
      }

      // Abrir o PDF no navegador
      const blobURL = URL.createObjectURL(blob);
      console.log("Blob URL:", blobURL);
      // window.open(blobURL);
  } catch (error) {
      console.error("Erro ao obter o ticket:", error);
  }
}


export async function getTickets() {
  let options = {
    method: 'POST',
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

  let data = await fetch(`${base_url}/fn_areceber`, options);

  // Verifique se a resposta foi bem-sucedida
  if (!data.ok) {
    throw new Error(`Erro ${data.status}: ${data.statusText}`);
  }

  // Para usar a resposta JSON:
  let faturas = await data.json();
  console.log(faturas)
  return faturas

}
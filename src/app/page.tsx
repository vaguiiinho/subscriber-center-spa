'use client'
export default async function getTicket() {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
    // Verifique se está no ambiente do navegador
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

    const response = await fetch(`${baseUrl}/api/proxy`, options);

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

    const blobURL = URL.createObjectURL(blob);
    console.log("Blob URL:", blobURL);

    // Executa no cliente (não no servidor)
    if (typeof window !== 'undefined') {
      window.open(blobURL);
    }

  } catch (error) {
    console.error("Erro ao obter o ticket:", error);
  }
}

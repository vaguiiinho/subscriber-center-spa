"use client"

import { useEffect, useState } from "react";

export default function Page() {
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

  const [ticket, setTicket] = useState<Blob | null>(null);

  useEffect(() => {
    const getTicket = async () => {
      try {
        const response = await fetch('/api/ticket', options);
        if (!response.ok) throw new Error('Erro ao obter o boleto');
        const blob = await response.blob();
        setTicket(blob);
      } catch (error) {
        console.error(error);
      }
    }
    getTicket();
  }, []);

  const downloadBlob = () => {
    if (ticket) {
      const url = URL.createObjectURL(ticket);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'boleto.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  if (!ticket) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div>Ticket recebido!</div>
      <button onClick={downloadBlob}>Baixar Boleto</button>
    </div>
  );
}

"use client"
import React from 'react'
import { getTicket } from '@/app/util/settings'

export default async function ButtonTicketViwe() {
    const test = getTicket()
    

    // const pdfBlob = await test.blob();

    // // Cria uma URL temporária para o Blob
    // const blobURL = URL.createObjectURL(pdfBlob);

    // // Abre o PDF em uma nova aba ou inicia o download
    // window.open(blobURL);

    return (
        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none" onClick={getTicket}>
            Visualizar
        </button>
    )
}

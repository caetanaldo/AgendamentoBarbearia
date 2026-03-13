import AgendamentoForm from "./components/AgendamentoForm"
import Resposta from "./components/Resposta"
import { useState } from "react"

export default function App(){

    const [mensagem, setMensagem] = useState("");

    return(
        <div className="container">
            <AgendamentoForm setMensagem={setMensagem}/>
            <Resposta mensagem={mensagem}/>
        </div>
    )
}
import { useState } from "react"
import Alerta from './Alerta'


const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {
    
    const [mensaje, setMensaje] = useState('')
    
    const handlePresupuesto = (e) => {
        e.preventDefault()
        if(!Number(presupuesto) || presupuesto < 0){
            setMensaje('No es un presupuesto valido')
            return;
        } 
        setMensaje('')
        
        presupuesto = Number(presupuesto)
        setPresupuesto(presupuesto)
        setIsValidPresupuesto(true)
    }
    return (  
        <div className="contenedor-presupuesto contenedor sombra">
            <form action="" className="formulario">
            <div className="campo">
                    <label htmlFor="presupuesto">
                        Definir presupuesto
                    </label>
                    <input type="number" 
                    name="" 
                    placeholder="Añade tu presupuesto"
                    className="nuevo-presupuesto"                    
                    id="presupuesto" 
                    value={presupuesto}
                    onChange={(e) => setPresupuesto(e.target.value)}
                    />
                    <input type="submit" className="" value="Añadir" onClick={handlePresupuesto} />
                    {mensaje && <Alerta tipo='error'>{mensaje}</Alerta>}
            </div>
            </form>
        </div>
    )
}
 
export default NuevoPresupuesto
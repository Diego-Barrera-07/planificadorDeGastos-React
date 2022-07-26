import { useState, useEffect } from "react"
import {CircularProgressbar, buildStyles} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({presupuesto, gastos, setPresupuesto, setGastos, setIsValidPresupuesto}) => {
    
    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000)


        setDisponible(totalDisponible)
        setGastado(totalGastado)
    }, [gastos])
    

    const handleResetApp = ()  => {
        const resultado = confirm('Deseas reiniciar tus presupuesto y gastos')
        if(resultado){
            setPresupuesto(0)
            setGastos([])
            setIsValidPresupuesto(false)
        }
    }
    
    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency', 
            currency: 'USD'
        })
    }
    return (  
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar 
                    styles={buildStyles({
                        pathColor: porcentaje <= 100 ? '#3B82F6' : '#DC2626' ,
                        textColor: '#3B82F6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}%`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}
                >
                    Reiniciar app
                </button>
                <p>
                    <span>Presupuesto:</span>
                    {' '}{formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible:</span>
                    {' '}{formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado:</span>
                    {' '}{formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}
 
export default ControlPresupuesto;
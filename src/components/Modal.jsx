import {useState, useEffect} from 'react'
import Alerta from './Alerta'
import CerrarBtn from '../assets/img/cerrar.svg'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {
    
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')
    
    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setFecha(gastoEditar.fecha)
            setId(gastoEditar.id)
        }
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()

        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Llena correctamente los campos')
            setTimeout(() => {
                setMensaje('')
            }, 3000)
            
            return;
        } else if(!Number(cantidad)){
            setMensaje('Tiene que ser un numero')   
            return;
        }

        guardarGasto({nombre, cantidad, categoria, fecha, id})
        
    }
    
    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500);
        setAnimarModal(false)
    }
    
    
    return ( 
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CerrarBtn}
                    alt="Cerrar modal"
                    onClick={ocultarModal}
                />
            </div>
            <form className={`formulario ${animarModal ? "animar" : "cerrar"}`}
                onSubmit={handleSubmit}
            >
                <legend>{gastoEditar.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>
                {mensaje && <Alerta tipo='error'>{mensaje}</Alerta>}
                <div className="campo">
                    <label htmlFor="nombre">Nombre del gasto</label>
                    <input type="text" 
                    name="" 
                    id="nombre" 
                    placeholder="Añade el nombre del gasto"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input type="number" 
                    name="" 
                    id="cantidad" 
                    placeholder="Añade la cantidad del gasto"
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="categoria">Categoría</label>
                    <select id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Sucripciones</option>
                    </select>
                </div>
                <input 
                type="submit" 
                value={gastoEditar.nombre ? 'Guardar cambios' : 'Añadir gasto'} 
                />
            </form>
        </div>

    )
}
 
export default Modal;
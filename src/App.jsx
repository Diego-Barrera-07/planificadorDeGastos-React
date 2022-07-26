import { useState, useEffect } from "react";
import Header from "./components/Header";
import IconoNuevoGasto from "./assets/img/nuevo-gasto.svg";
import { generarId } from "./helpers";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
import Filtro from "./components/Filtro"

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? ''
    )

  const [gastos, setGastos] = useState(
      localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
    )

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    const presupuestoToLocal = Number(localStorage.getItem('presupuesto')) ?? 0

    if(presupuestoToLocal > 0){
      setIsValidPresupuesto(true)

    }
  }, [])

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 1000);
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos)) ?? []
  }, [gastos])

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 1000);
  }

  const guardarGasto = (gasto) => {
    if(gasto.id){
      
      // Si hay Id vamos a actualizar el objeto que tenga ese mismo id
      const gastosActualizados = gastos.map(gastoState => gastoState.id ===
      gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
      
    } else {

      // En este caso generamos un id nuevo de igual forma su fecha
      gasto.id = generarId();
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto]);
  }
    setTimeout(() => {
      setModal(false);
    }, 500);
   setAnimarModal(false);
  }
  
   
  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)  
  }


  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
        <main>
        
        <Filtro 
          filtro={filtro}
          setFiltro={setFiltro}
        />
        <ListadoGastos
          gastos={gastos}
          setGastoEditar={setGastoEditar}
          eliminarGasto={eliminarGasto}
          filtro={filtro}
          gastosFiltrados={gastosFiltrados}
        />

        </main>
        <div className="nuevo-gasto">
          <img
            src={IconoNuevoGasto}
            alt="Icono nuevo gasto"
            onClick={handleNuevoGasto}
          />
        </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastos={gastos}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;

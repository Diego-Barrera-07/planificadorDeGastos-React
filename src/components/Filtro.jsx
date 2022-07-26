import { useState, useEffect } from 'react'

const Filtro = ({filtro, setFiltro}) => {
  return (
    <div className="filtros sombra contenedor">
        <form action="">
            <div className='campo'>
                <label htmlFor="filtro">Filtrar gastos</label>
                <select id="filtro"
                        value={filtro}
                        onChange={e => setFiltro(e.target.value)}
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
        </form>
    </div>
  )
}

export default Filtro
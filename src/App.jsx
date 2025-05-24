import { useState, useEffect } from "react";

const BACKEND_URL = "https://back-robot-arduino.vercel.app";

export const App = () => {
  const [temperatura, setTemperatura] = useState(null);
  const [estado, setEstado] = useState("parar");

  const enviarComando = async (accion) => {
    await fetch(`${BACKEND_URL}/comando`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accion }),
    });
    setEstado(accion);
  };

  useEffect(() => {
    const intervalo = setInterval(async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/temperatura`);
        const data = await res.json();
        setTemperatura(data.valor);
      } catch (error) {
        console.log(error.message, "Error al obtener temperatura");
      }
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Panel de Control del Robot</h1>
      <div className="container d-flex  justify-content-center">
        <div className="row">
          <div className="col-12">
            <div className="alert alert-info">
              Temperatura actual:{" "}
              <strong>{temperatura ?? "Cargando..."} °C</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <h4>
          Comando actual: <span className="badge bg-secondary">{estado}</span>
        </h4>
      </div>

      <div className=" col-5 mx-auto border border-primary rounded-5 border-4 p-5">
        <button
          className="btn btn-primary mb-3"
          onClick={() => enviarComando("adelante")}
        >
          Adelante
        </button>

        <div className="d-flex justify-content-center">
          <button
            className="btn btn-warning"
            onClick={() => enviarComando("izquierda")}
          >
            Izquierda
          </button>
          <button
            className="btn btn-danger me-3 ms-3"
            onClick={() => enviarComando("parar")}
          >
            Parar
          </button>
          <button
            className="btn btn-warning"
            onClick={() => enviarComando("derecha")}
          >
            Derecha
          </button>
        </div>

        <button
          className="btn btn-primary mt-3"
          onClick={() => enviarComando("atras")}
        >
          Atrás
        </button>
      </div>
    </div>
  );
};

import "./About.css";

export const About = () => {
    return (
        <div className="aboutDesign">
            <div>
                <div className="header">
                    Somos sanitarios desde 1999. Pasión, experiencia, formación, innovación y rigor forman parte de nuestro ADN.
                </div>
                <div className="introduction">
                    Nuestra oferta es de alta calidad con garantías profesionales.
                    Cada día, todos los que formamos este proyecto nos esforzamos en una cosa, siempre tenemos el mismo objetivo, que vuestra salud sea lo primero.
                    El compromiso con un trabajo serio es nuestra filosofía.
                    Cada día intentamos perfeccionar el más mínimo detalle para que podamos ser los mejores y destacar entre los demás.
                </div>
                <div className="question">
                    ¿Cómo trabajamos?
                </div>
            </div>
            <div className="total">
                <div className="one">
                    <div className="title">
                        <img src="../../src/images/number1.png" width="4%"></img> Evaluar
                    </div>
                    <div className="pointOne">
                        <div>
                            Evaluación minuciosa y valoración
                            del historial clínico y de las pruebas
                            diagnósticas en caso de ser aportadas.
                        </div>
                    </div>
                    <div className="title">
                        <img src="../../src/images/number3.png" width="4%"></img> Derivar
                    </div>
                    <div className="pointOne">
                        <div>
                            Derivamos a uno de nuestros
                            especialistas, el que mejor
                            se adapta al problema
                            diagnosticado.
                        </div>
                    </div>
                </div>
                <div className="two">
                    <div className="space"></div>
                    <div className="title">
                        <img src="../../src/images/number2.png" width="4%"></img> Proponer
                    </div>
                    <div className="pointTwo">
                        <div>
                            Proponemos el mejor tratamiento,
                            dependiendo de la singularidad
                            de cada paciente.
                        </div>
                    </div>
                    <div className="title">
                        <img src="../../src/images/number4.png" width="4%"></img> Reevaluar
                    </div>
                    <div className="pointTwo">
                        <div>
                            Después de un determinado
                            periodo, evaluamos nuevamente
                            al paciente, comprobando
                            sus cambios y/o mejoras.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
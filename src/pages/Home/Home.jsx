import "./Home.css";
import { Col } from "react-bootstrap";

export const Home = () => {
    return (
        <Col sm={12} lg={6} xl={4} xxl={3} className="homeDesign">
            <div className="upperCaseDesign">
                <div className="iconsDesign">
                    <div className="mailIcon">
                        <a href="https://www.pterion.fisioterapiavlc@gmail.com/">
                            <span className="icon">gm</span>
                        </a>
                    </div>
                    <div className="instagramIcon">
                        <a href="https://www.instagram.com/fisio.pterion/">
                            <span className="icon">in</span>
                        </a>
                    </div>
                    <div className="whatsappIcon">
                        <a href="https://api.whatsapp.com/send?phone=34644340493">
                            <span className="icon">wa</span>
                        </a>
                    </div>
                    <div className="mapsIcon">
                        <a href="https://maps.app.goo.gl/BdV6EJ4a1R2UiWGZA">
                            <span className="icon">ma</span>
                        </a>
                    </div>
                </div>
                <div className="coverModelDesign"></div>
            </div>
        </Col>
    )
}

import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import image from "../images/moshaph.png";

import icon from "../images/icon.png";
function HeroSection() {
  return (
    <>
      <Row className="heroSection" style={{ direction: "ltr" }}>
        <Col xs="6" className="group">
          <h1>
            قرآنى
            <Image
              src={icon}
              style={{ width: "220px", position: "absolute", top: "-40px" }}
            />
          </h1>
          <p>
            مرحبًا بكم في “قرآني”، المنصة التي تجمع بين جمال وروحانية القرآن
            الكريم والتكنولوجيا الحديثة. نسعى لتقديم تجربة فريدة ومميزة لكل محب
            للقرآن، حيث يمكنكم الاستماع إلى التلاوات العذبة، وقراءة التفاسير
            المتنوعة، والتفاعل مع محتوى تعليمي يثري معرفتكم الدينية. انضموا
            إلينا في رحلتنا الروحانية لاكتشاف كنوز القرآن الكريم وتعميق فهمكم
            لآياته المباركة.
          </p>
        </Col>
        <Col
          xs="6"
          className="justify-content-center align-items-center d-flex"
        >
          <Image src={image} rounded style={{ width: "70%" }} />
        </Col>
      </Row>
    </>
  );
}

export default HeroSection;

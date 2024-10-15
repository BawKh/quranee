import Container from "react-bootstrap/Container";
import Surah from "./Surah";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import Button from "react-bootstrap/Button";

function Moshaph() {
  const [showMore, setMore] = useState(1); // Controls how many Surahs to display
  const numbers = Array.from({ length: showMore }, (_, i) => i + 1); // Create an array [1, 2, 3, ...]

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">المصحف</h1>
          {numbers.map((el) => {
            return <Surah key={`${el}_surah`} currant={{ surahID: el }} />; // Pass unique surahID
          })}
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Button variant="danger" onClick={() => setMore(showMore + 1)}>
          More
        </Button>
      </Row>
    </Container>
  );
}

export default Moshaph;

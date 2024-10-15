import Card from "react-bootstrap/Card";
import surahImg from "../images/Quran2.png";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
function AppCard(props) {
  const { surah, ID } = props;
  return (
    <Col sm="6" lg="4" xxl="3" key={surah.surahName}>
      <Card className="card text-center">
        <Card.Img variant="top" src={surahImg} />
        <Card.Body>
          <Card.Title>{surah.surahNameArabicLong}</Card.Title>
          <Card.Text>{surah.revelationPlace}</Card.Text>
          <Card.Text>عدد الآيات:{surah.totalAyah}</Card.Text>
          <Link
            variant="primary"
            className="btn bg-primary text-light"
            to={`/moshaph/${ID}`}
          >
            افتح السورة
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}
export default AppCard;

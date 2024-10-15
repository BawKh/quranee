import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSurah } from "../rtk/slices/Surahs-slices";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import AppCard from "./Card";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

function Chapters() {
  const [numCards, setNumCards] = useState(8);
  const [open, setOpen] = useState(false); // State to manage collapse

  let surahs = useSelector((state) => state.surah);
  console.log(surahs);
  const dispatch = useDispatch();

  const updateNumCards = () => {
    const XL_BREAKPOINT = 1400; // Define your XL breakpoint width
    if (window.innerWidth >= XL_BREAKPOINT) {
      setNumCards(8);
    } else {
      setNumCards(6);
    }
  };

  useEffect(() => {
    dispatch(fetchSurah());
    window.addEventListener("resize", () => {
      updateNumCards();
      console.log(numCards);
    });
  }, [dispatch, numCards]);

  return (
    <Container>
      <h2 className="text-center fs-1 fw-bold mt-5">السور</h2>
      <Row className="surahCatcher justify-content-center">
        {surahs.slice(0, numCards).map((surah, index) => (
          <AppCard key={index} surah={surah} ID={index + 1} />
        ))}
        <Button
          variant={open ? "dark" : "light"}
          className="w-100"
          onClick={() => setOpen(!open)}
          aria-controls="surah-collapse-text"
          aria-expanded={open}
        >
          {open ? "أقل" : "المزيد"}
        </Button>
        <Collapse in={open}>
          <div id="surah-collapse-text" className="pt-2">
            <Row className="justify-content-center">
              {surahs.slice(numCards).map((surah, index) => (
                <AppCard key={index} surah={surah} ID={index + numCards + 1} />
              ))}
            </Row>
          </div>
        </Collapse>
      </Row>
    </Container>
  );
}

export default Chapters;

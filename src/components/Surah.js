import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneSurah } from "../rtk/slices/OneSurah-slice";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import AyahAudioPlayer from "./Ayah";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";

function Surahs({ currant }) {
  const [Reciter, setReciter] = useState(1);
  const [activeAyah, setActiveAyah] = useState(null); // Use null for no active Ayah initially
  const [isPlaying, SetisPlaying] = useState(null);
  const [Played, setPlayed] = useState(false);
  const [error, setError] = useState(null); // Add error state
  const [activeButton, setActiveButton] = useState(1); // State to track active button

  let params = useParams();
  params = Object.keys(params).length !== 0 ? params : currant; // Fallback to currant if params is empty

  // Fetch surah data from Redux based on surahID
  const surah = useSelector((state) => state.oneSurah[params.surahID]);

  const dispatch = useDispatch();
  // Reset Played state when Reciter changes
  useEffect(() => {
    setPlayed(false);
  }, [Reciter]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchOneSurah({ surahID: params.surahID, Reciter }));
      } catch (err) {
        setError(err.message); // Set error message
      }
    };
    fetchData();
  }, [dispatch, Reciter, params, surah]);

  // Return loading if surah isn't yet loaded
  if (!surah) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>; // Display error message
  }

  const handleButtonClick = (reciter) => {
    setReciter(reciter);
    setActiveButton(reciter); // Update active button state
  };

  function StartPlay(element) {
    if (!element) {
      console.error("Audio element not found");
      return;
    }
    // Get all child nodes (including text nodes)
    const childNodes = element.parentElement.parentElement.childNodes;

    // Iterate over the child nodes and log them
    childNodes.forEach((node) => {
      node.classList.remove("active");
    });

    // Check if the audio is ready to play
    if (element.readyState < 3) {
      console.log("Audio not ready to play");
      element.addEventListener("canplaythrough", () => {
        console.log("Audio is now ready to play, starting...");
        element.play();
        setPlayed(true); // Set Played to true when audio starts
      });
      return;
    }

    if (!element.paused) {
      console.log("Audio is already playing");
      return;
    }

    // Ensure volume is set and not muted
    element.volume = 1.0;
    element.muted = false;

    element.parentElement.classList.add("active");

    element
      .play()
      .then(() => {
        setPlayed(true); // Set Played to true when audio starts
      })
      .catch((error) => {
        console.error("Error playing audio:", error);
      });

    element.addEventListener("ended", function () {
      setTimeout(() => element.parentElement.classList.remove("active"), 0);
    });
  }

  return (
    <Container>
      <div className="header">
        <h1 className="text-center">{surah.surahNameArabicLong}</h1>
      </div>
      <div className="mt-5 surah-container mx-auto h-auto">
        <Row className="justify-content-center align-items-center position-relative">
          <h2 className="text-center mb-3 h-auto">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </h2>
          <div className="d-inline-block w-100 text-center" id="surah">
            {surah.arabic1 &&
              surah.arabic1.map((ayah, index) => (
                <AyahAudioPlayer
                  key={`${index}-aya`} // Use a unique identifier if available
                  ayah={ayah}
                  index={index}
                  surahNumber={params.surahID}
                  totalAyahs={surah.arabic1.length}
                  audioUrl={surah.audioUrls} // Get URL from Redux state
                  activeAyah={activeAyah} // This activeAyah is specific to this component instance
                  setActiveAyah={setActiveAyah} // Same for setter functions
                  isPlaying={isPlaying}
                  setisPlaying={SetisPlaying}
                  setPlayed={setPlayed}
                />
              ))}
          </div>
          <Row
            className="fixed-buttons justify-content-center"
            style={{ position: "absolute", bottom: "-20px", width: "100%" }}
          >
            <Col xs="1" className="text-center">
              <Button
                variant="danger"
                onClick={() => SetisPlaying(false)}
                style={{
                  transition: "transform 0.3s ease, background-color 0.3s ease",
                }}
              >
                stop
              </Button>
            </Col>
            <Col xs="1" className="text-center">
              <Button
                variant="dark"
                onClick={() => SetisPlaying(true)}
                style={{
                  transition: "transform 0.3s ease, background-color 0.3s ease",
                  width: "fill-content",
                  overflow: "hidden",
                }}
              >
                play
              </Button>
            </Col>
            <Col xs="1" className="text-center">
              <Button
                variant="success"
                onClick={() => {
                  return (
                    Played === false &&
                    StartPlay(
                      document.getElementById(`audio-${params.surahID}-${0}`)
                    )
                  );
                }}
                style={{
                  transition: "transform 0.3s ease, background-color 0.3s ease",
                }}
              >
                start
              </Button>
            </Col>
          </Row>
        </Row>
      </div>
      <Row>
        <Row className="align-items-center w-100 justify-content-center py-3">
          <Col xs="4" className="justify-content-center">
            <Button
              variant={activeButton === 1 ? "info" : "outline-info"} // Conditional styling
              className="p-2 fs-5 w-100"
              onClick={() => handleButtonClick(1)}
            >
              Abu Bakr Al-Shatri
            </Button>
          </Col>
          <Col xs="4" className="justify-content-center">
            <Button
              variant={activeButton === 2 ? "info" : "outline-info"} // Conditional styling
              className="p-2 fs-5 w-100"
              onClick={() => handleButtonClick(2)}
            >
              Mishary Rashid Al-Afasy
            </Button>
          </Col>
        </Row>

        <h4
          className="text-center fw-bold p-5"
          style={{
            height: "240px",
            border: "1px solid gray",
            borderRadius: "5px",
          }}
        >
          “اللهم اجعل القرآن ربيع قلبي، ونور صدري، وجلاء حزني، وذهاب همي. اللهم
          اجعلني ممن يقرأه فيرقى، ولا تجعلني ممن يقرأه فيشقى. اللهم تقبل مني
          قراءتي للقرآن، واجعلها شفيعة لي يوم القيامة، واغفر لي ولوالدي ولجميع
          المسلمين.”
          <div className="fs-4">والسلام عليكم ورحمة الله وبركاته.</div>
        </h4>
      </Row>
    </Container>
  );
}

export default Surahs;

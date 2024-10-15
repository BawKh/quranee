export default function AppFooter() {
  return (
    <footer>
      <div
        className="text-center p-3 w-100"
        style={{ backgroundColor: "#212529ad", color: "white" }}
      >
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a className="text-light navbar-brand" href="/">
          قـرآنـى
        </a>
      </div>
    </footer>
  );
}

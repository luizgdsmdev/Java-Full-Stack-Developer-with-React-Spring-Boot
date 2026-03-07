import Footer from "./components/shared/footer/Footer.jsx";
import Header from "./components/shared/Header/Header.jsx";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import Country from "./pages/Country";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Homepage/>} />
          <Route path="/:country" element={<Country/>} />
          {/* <Route path="*" element={<NotFound/>}/> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
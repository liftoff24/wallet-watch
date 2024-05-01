import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import FraudDetection from "scenes/fraud-detection";
import Cryptocurrencies from "scenes/cryptocurrencies";
import Exchanges from "scenes/exchanges";
import News from "scenes/news";
import Whitelisting from "scenes/whitelisting";
import Overview from "scenes/overview";
import CryptoDetails from "scenes/crypto-details";
import Signup from "scenes/signup";
import Login from "scenes/login";
import { Axios } from "axios";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // const [user, setUser] = useState(null);

  // const getUser = async () => {
  //   try {
  //     const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
  //     const { data } = await Axios.get(url, { withCredentials: true });
  //     setUser(data.user._json);
  //   } catch (error) {
  //       console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
  <div className="app">
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* <Route path="/" element = {user ? <Layout user={user} /> : <Navigate to="/login"/>}> */}
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to ="/fraud-detection" replace />} />
            <Route path="/fraud-detection" element={<FraudDetection />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/news" element={<News />} />
            <Route path="/whitelisting" element={<Whitelisting />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </div>
  );
}

export default App;

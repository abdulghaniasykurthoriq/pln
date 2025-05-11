import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header"; // Pastikan Header diimpor dari lokasi yang benar
import Sidebar from "./components/Sidebar"; // Pastikan Sidebar diimpor dari lokasi yang benar
import Dashboard from "./pages/Dashboard";
import Form from "./pages/Form";
import ListBookRoom from "./pages/ListBookRoom";
import AdditionalTest from "./pages/AdditionalTest";

function App() {
  return (
    <Router>
      <div>
        <Header />

        <div className="min-h-screen flex">
          <Sidebar />

          <div
            className="flex-1 flex flex-col"
            style={{ backgroundColor: "#fefefe" }}
          >
            <main className="p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/booking-room" element={<ListBookRoom />} />
                <Route path="/create" element={<Form />} />
                <Route path="/additional-test" element={<AdditionalTest />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

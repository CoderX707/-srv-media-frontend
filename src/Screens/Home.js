import React from "react";
import ChannelsList from "../Components/ChannelsList";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <ChannelsList />
      <Footer />
    </>
  );
}

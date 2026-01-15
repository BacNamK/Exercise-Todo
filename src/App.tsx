import React from "react";
import Home from "./components/Home";
import { Toaster } from "sonner";

class App extends React.Component {
  render() {
    return (
      <>
        <Home />
        <Toaster />
      </>
    );
  }
}
export default App;

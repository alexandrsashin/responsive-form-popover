import "./App.css";
import ResponsiveFormPopover from "./ResponsiveFormPopover";

function App() {
  return (
    <div style={{ padding: "40px", textAlign: "center", minHeight: "600px" }}>
      <h1>Адаптивная форма в поповере</h1>
      <ResponsiveFormPopover />
    </div>
  );
}

export default App;

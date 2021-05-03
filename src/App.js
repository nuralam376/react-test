import "./App.css";
import SearchItem from "./components/Items/SearchItem";
import AddTax from "./components/Tax/AddTax";

function App() {
  return (
    <div className="container">
      <AddTax />
      <SearchItem />
    </div>
  );
}

export default App;


import "./App.css";
import $ from "jquery";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    $(".App-header span").hover(
      (e) => {
        // 오버시
        $(e.currentTarget).stop().animate(
          {
            scale: 1.4,
          },
          500
        );
      },
      (e) => {
        // 아웃시
        $(e.currentTarget).stop().animate(
          {
            scale: 1,
          },
          500
        );
      }
    );
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <span>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF1IwK6-SxM83UpFVY6WtUZxXx-phss_gAUfdKbkTfau6VWVkt"
            className="App-logo"
            alt="logo"
          />
        </span>
        <p>
          리액트
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

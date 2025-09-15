import { useEffect, useState } from "react";
import "./MainView.css";

interface MainViewProps {
  setView: (view: "main" | "history") => void;
}

function MainView({ setView }: MainViewProps) {

  const now = new Date();
  const date = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const today = `${year}년 ${month}월 ${date}일`

  const [questions, setQuestions] = useState<{ [ key: string ]: string }[]>([]);
  useEffect(() => {
    // Data fetching
    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setQuestions(data);
      })

    // state로 데이터 저장
  }, []);

  return (
    <>
      <div className="header">
        <div>{ today }</div>
        <div>
          <button
            className="history-btn"
            onClick={() => {
              setView("history")
            }}>
            기록 보기
          </button>
        </div>
      </div>
      <div className="question">{ questions[date] }</div>
      <div className="content">
        <textarea
          onChange={() => {
            console.log("onChange");
          }}
        />
      </div>
    </>
  );
}

export default MainView;

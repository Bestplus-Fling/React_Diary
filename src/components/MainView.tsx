import { useEffect, useState } from "react";
import "./MainView.css";
import { useDiaryData } from "../utils";

interface MainViewProps {
  setView: (view: "main" | "history") => void;
}



function MainView({ setView }: MainViewProps) {

  const now = new Date();
  const date = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const today = `${year}년 ${month}월 ${date}일`

  // const diaryData = useMemo(() => getDiaryData(), []);
  // const diaryData = getDiaryData();
  const diaryData = useDiaryData();

  const [questions, setQuestions] = useState<{ [ key: string ]: string }>({});
  // const [questions, setQuestions] = useState();

  const [input, setInput] = useState<string>(diaryData[today]);

  useEffect(() => {
    // Data fetching
    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      })

    // state로 데이터 저장
  }, []);

  if (!questions){
    return <div>Loading...</div>;
  }

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
          value={input}
          onChange={(e) => {
            // console.log("onChange");
            const value = e.target.value;
            setInput(value);
            window.localStorage.setItem(
              "diary",
              JSON.stringify({ ...diaryData, [today]: value || "" })
            );
          }}
        />
      </div>
    </>
  );
}

export default MainView;

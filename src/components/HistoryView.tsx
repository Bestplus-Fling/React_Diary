import "./HistoryView.css";

interface HistoryViewProps {
  setView: (view: "main" | "history") => void;
}

function HistoryView({setView} : HistoryViewProps) {

  const diaryData = JSON.parse(window.localStorage.getItem("diary") || "{}");

  const diaryEntries = Object.entries(diaryData) as [string, string][];

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          className="back-btn"
          onClick={() => {
            setView("main");
          }}>
          &lt;
        </button>
        <h4>다이어리 기록</h4>
      </div>
      { diaryEntries.map((entry) => {
        return (
          <div className="diary-item" key={entry[0]}>
            <div className="diary-date">{entry[0]}</div>
            <div>{entry[1]}</div>
          </div>
        )
      })}
    </>
  );
}
export default HistoryView;

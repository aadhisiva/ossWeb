import "./halfDonutCircle.css";

export default function HalfDonutCircle({ onClick, title }: any) {
  const myObject = { "--percentage": 50, "--fill": "#0669AD" } as {
    [key: string]: any;
  };
  return (
    <div className="reviewBorder" onClick={onClick}>
      <div className="single-graph margin">
        <span className="graphTitle">{"70%"}</span>
        <div className="graph" data-name="Completed" style={myObject}></div>
        <div className="graph" data-name="Average" style={myObject}></div>
        <div className="graph" data-name="Low" style={myObject}></div>
      </div>
        <span className="graphTitle">{title}</span>
      {/* <div className="identifier">
        <div className="eachCard">
          <span className="eachBox" style={{ backgroundColor: '#0669AD' }}></span>
          <span className="eachBoxTitle">Completed</span>
        </div>
        <div className="eachCard">
          <span className="eachBox" style={{ backgroundColor: '#E62A39' }}></span>
          <span className="eachBoxTitle">Average</span>
        </div>
        <div className="eachCard">
          <span className="eachBox" style={{ backgroundColor: '#FEDA3E' }}></span>
          <span className="eachBoxTitle">Low</span>
        </div>
      </div> */}
    </div>
  );
}

import "./halfDonutCircle.css";
interface IHalfDonut {
  onClick?: any;
  title?: string;
  percentage?: any;
};

export default function HalfDonutCircle({ onClick, title, percentage }:IHalfDonut) {

  const donutCircle = (percentage: any) => {
    return { "--percentage": Number(percentage), "--fill": "#0f172a" } as {
      [key: string]: any;
    }; 
  }
 
  return (
    <div className="reviewBorder" onClick={onClick}>
      <div className="single-graph margin">
        <span className="graphTitle">{percentage}</span>
        <div className="graph" data-name="Completed" style={donutCircle(percentage)}></div>
        {/* <div className="graph" data-name="Average" style={donutCircle(percentage)}></div> */}
        {/* <div className="graph" data-name="Low" style={donutCircle(percentage)}></div> */}
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

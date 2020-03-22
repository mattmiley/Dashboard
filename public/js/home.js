// "use strict";
const e = React.createElement;

var myLineChart;


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      periods: []      
    };
  }

  async componentDidMount() {
    await this.getWeather();
  }

  //

  
  getWeather = async () => {
    try {
      const response = await fetch("https://api.weather.gov/gridpoints/CLE/98,74/forecast/hourly");
      const result = await response.json();
      const periods = result.properties.periods.slice(0, 18);      
      this.setState({ periods });
    } catch (err) {
      alert(err);
    }
  };

  render() {
    const {
      periods
    } = this.state;
    return (
      <div>
        <AppNav />
  

          <div class="container-fluid">
            <h1 class="display-4">Home Dashboard</h1>
            {/* <p class="lead">This is the Miley Home Dashboard.</p> */}

            <ul>
      {periods.map((temperature) =>
        <li><div>
          <p>{temperature.temperature.toString() + " °F"}</p>
          <p>{temperature.windSpeed}</p>
          <p>{temperature.windDirection}</p>
          <p>{temperature.shortForecast}</p>
          <img src={temperature.icon}></img>
          <p>{temperature.startTime.split('T')[0] + ' ' + temperature.startTime.split('T')[1].split(":")[0]}</p>
          </div></li>
      )}
    </ul>
            {/* <hr class="my-4"/>
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <p class="lead">
              <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
            </p> */}
          </div>
      
      </div>
    );
  }
}

const domContainer = document.querySelector("#root");
ReactDOM.render(e(Home), domContainer);

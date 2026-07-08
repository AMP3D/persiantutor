import { months, weekdays } from '../../data/calendar';
import './daysMonths.scss';

const DaysMonths = () => (
  <div className="days-months">
    <h2 className="days-months__heading">Days &amp; Months</h2>
    <p className="days-months__intro">
      The Persian week runs Saturday (shanbe) to Friday (jome). Months follow the Jalali (solar)
      calendar; each spans two Gregorian months.
    </p>

    <h3 className="days-months__subheading">Days of the week</h3>
    <div className="days-months__table-wrap">
      <table className="days-months__table">
        <thead>
          <tr>
            <th>Farsi</th>
            <th>Finglish</th>
            <th>Day</th>
          </tr>
        </thead>
        <tbody>
          {weekdays.map((day) => (
            <tr key={day.finglish}>
              <td className="days-months__farsi">{day.farsi}</td>
              <td className="days-months__finglish">{day.finglish}</td>
              <td>{day.english}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h3 className="days-months__subheading">Months of the year</h3>
    <div className="days-months__table-wrap">
      <table className="days-months__table">
        <thead>
          <tr>
            <th>Farsi</th>
            <th>Finglish</th>
            <th>Month</th>
          </tr>
        </thead>
        <tbody>
          {months.map((month) => (
            <tr key={month.finglish}>
              <td className="days-months__farsi">{month.farsi}</td>
              <td className="days-months__finglish">{month.finglish}</td>
              <td>{month.english}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DaysMonths;

import { persianNumbers } from './numbers';
import './numbers.scss';

const Numbers = () => (
  <div className="numbers">
    <h2 className="numbers__heading">Persian Numbers</h2>
    <p className="numbers__intro">
      Persian uses Eastern Arabic numerals (۰–۹). Numbers are read left-to-right, same as English.
    </p>

    <div className="numbers__table-wrap">
      <table className="numbers__table">
        <thead>
          <tr>
            <th>Value</th>
            <th>Numeral</th>
            <th>Farsi</th>
            <th>Finglish</th>
          </tr>
        </thead>
        <tbody>
          {persianNumbers.map((entry) => (
            <tr key={entry.value}>
              <td className="numbers__value">{entry.value}</td>
              <td className="numbers__numeral">{entry.numeral}</td>
              <td className="numbers__farsi">{entry.farsi}</td>
              <td className="numbers__finglish">{entry.finglish}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Numbers;

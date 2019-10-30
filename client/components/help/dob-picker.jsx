import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DOBPicker(props) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={date => {
        console.log(date, typeof date);
        props.updateDOBCallback(date.getTime() / 1000);
        setStartDate(date);
      }}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
    />
  );
}

// import React from 'react';
// import DayPicker from 'react-day-picker';
// import 'react-day-picker/lib/style.css';

// const currentYear = new Date().getFullYear();
// const fromMonth = new Date(currentYear - 30, 0);
// const toMonth = new Date(currentYear, 11);

// function YearMonthForm({ date, localeUtils, onChange }) {
//   const months = localeUtils.getMonths();

//   const years = [];
//   for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i++) {
//     years.push(i);
//   }

//   const handleChange = event => {
//     const { year, month } = event.target.form;
//     onChange(new Date(year.value, month.value));
//   };

//   return (
//     <form className="DayPicker-Caption">
//       <select name="month" onChange={handleChange} value={date.getMonth()}>
//         {months.map((month, i) => (
//           <option key={month} value={i}>
//             {month}
//           </option>
//         ))}
//       </select>
//       <select name="year" onChange={handleChange} value={date.getFullYear()}>
//         {years.map(year => (
//           <option key={year} value={year}>
//             {year}
//           </option>
//         ))}
//       </select>
//     </form>
//   );
// }

// export default class DOBPicker extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
//     this.state = {
//       month: fromMonth
//     };
//   }

//   handleYearMonthChange(month) {
//     this.setState({ month });
//   }

//   render() {
//     return (
//       <div className="YearNavigation">
//         <DayPicker
//           month={this.state.month}
//           fromMonth={fromMonth}
//           toMonth={toMonth}
//           captionElement={({ date, localeUtils }) => (
//             <YearMonthForm
//               date={date}
//               localeUtils={localeUtils}
//               onChange={this.handleYearMonthChange}
//             />
//           )}
//         />
//       </div>
//     );
//   }
// }

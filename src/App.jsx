import { useState } from "react";

const App = () => {
  // States
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [errors, setErrors] = useState({ day: "", month: "", year: "" });

  // Values
  const dayValue = (e) => {
    setDay(e.target.value);
    setErrors((prev) => ({ ...prev, day: validateDay(e.target.value) }));
  };
  const monthValue = (e) => {
    setMonth(e.target.value);
    setErrors((prev) => ({ ...prev, month: validateMonth(e.target.value) }));
  };
  const yearValue = (e) => {
    setYear(e.target.value);
    setErrors((prev) => ({ ...prev, year: validateYear(e.target.value) }));
  };
  // Functions
  const birthdayCalculator = (day, month, year) => {
    const birthday = new Date(year, month - 1, day);
    const today = new Date();

    let calcYear = today.getFullYear() - birthday.getFullYear();
    let calcMonth = today.getMonth() - birthday.getMonth();
    let calcDay = today.getDate() - birthday.getDate();

    if (calcDay < 0) {
      calcMonth--;
      calcDay += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (calcMonth < 0) {
      calcYear--;
      calcMonth += 12;
    }
    return { years: calcYear, months: calcMonth, days: calcDay };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.day || errors.month || errors.year) {
      console.log("Hay errores en el formulario.");
      return;
    }
    const calculateAge = birthdayCalculator(day, month, year);
    setAge(calculateAge);
    console.log("Edad", calculateAge);
  };
  //  Validation
  const validateDay = (value) => {
    if (value < 1 || value > 31) {
      return "Must be a valid day";
    }
    return "";
  };
  const validateMonth = (value) => {
    if (value < 1 || value > 12) {
      return "Must be a valid month";
    }
    return "";
  };
  const validateYear = (value) => {
    const currentYear = new Date().getFullYear();
    if (value < 1900 || value > currentYear) {
      return `Must be in the past`;
    }
    return "";
  };

  return (
    <>
      <section className="w-screen h-screen pt-20 block bg-slate-200">
        <div className="w-80 h-3/6 mx-auto bg-white rounded-3xl rounded-br-[150px]">
          <form className="w-full h-40 flex items-center justify-center relative">
            <div className="flex items-center justify-center gap-4 ">
              <label className="text-slate-500 text-xs font-bold tracking-widest flex flex-col gap-1">
                DAY
                <input
                  className="w-20 h-10 rounded-lg  border focus:border-violet-400 outline-none font-bold text-black text-base p-2  invalid:border-red-500"
                  required
                  type="text"
                  placeholder="DD"
                  onChange={(e) => console.log(dayValue(e))}
                />
              </label>{" "}
              <label className="text-slate-500 text-xs font-bold tracking-widest flex flex-col gap-1">
                MONTH
                <input
                  required
                  className="w-20 h-10 rounded-lg border focus:border-violet-400 outline-none font-bold text-black text-base p-2 invalid:border-red-500"
                  type="text"
                  placeholder="MM"
                  onChange={(e) => console.log(monthValue(e))}
                />
              </label>{" "}
              <label className="text-slate-500 text-xs font-bold tracking-widest flex flex-col gap-1">
                YEAR
                <input
                  required
                  className=" w-20 h-10 rounded-lg border focus:border-violet-400 outline-none font-bold text-black text-base p-2 invalid:border-red-500"
                  type="text"
                  placeholder="YYYY"
                  onChange={(e) => console.log(yearValue(e))}
                />
              </label>
            </div>
            <button
              className="absolute bottom-0 translate-y-1/2 bg-violet-500 hover:bg-black rounded-full p-4"
              onClick={(e) => handleSubmit(e)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="24"
                viewBox="0 0 46 44"
              >
                <g fill="none" stroke="#FFF" strokeWidth="3">
                  <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
                </g>
              </svg>
            </button>
          </form>
          <hr className="w-4/5 m-auto" />
          <div className="w-3/4 m-auto py-16 font-bold text-5xl">
            {age.years > 0 ? (
              <>
                <p>
                  <span className=" text-violet-500">{age.years}</span> years
                </p>
                <p>
                  <span className=" text-violet-500">{age.months}</span> months
                </p>
                <p>
                  <span className=" text-violet-500">{age.days}</span> days
                </p>
              </>
            ) : (
              <>
                <p>
                  <span className=" text-violet-500">- -</span> years
                </p>
                <p>
                  <span className=" text-violet-500">- -</span> months
                </p>
                <p>
                  <span className=" text-violet-500">- -</span> days
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default App;

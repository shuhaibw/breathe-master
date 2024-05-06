import styles from "@/styles/tracker.module.css";
import { parse } from "cookie";
import { useEffect } from "react";
import { useState } from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
  VictoryLine,
  VictoryLabel,
} from "victory";

export default function Tracker() {
  function addEntry() {
    let today = new Date().toISOString();
    fetch("/api/addentry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date: today, cigs: Cigs }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHistory(
          History.filter((a) => {
            console.log(new Date(a).getDay(), new Date(today).getDay());

            return new Date(a).day == new Date(today).day;
          }).concat({ Date: today, value: parseInt(Cigs) })
        );
      });
  }
  function updateHistory() {
    fetch("/api/userhistory")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("here");
        let history = data.history;
        for (let i = 0; i < history.length; i++) {
          history[i].value = parseInt(history[i].value);
        }
        console.log(history.filter);
        history = history.filter((      a) => {
            console.log(Date.parse(a.Date));
            return Date.parse(a.Date) != NaN;
        })
        history = history.sort((a, b) => new Date(a.Date) - new Date(b.Date));
        setHistory(data.history);

      });
  }
  const [History, setHistory] = useState([]);

  let oldest = History.map((entry) => new Date(entry.Date)).reduce(
    (acc, date) => (date < acc ? date : acc),
    new Date()
  );

  let days = Math.floor((new Date() - oldest) / (1000 * 60 * 60 * 24));
  for (let i = 0; i < days; i++) {
    let time = new Date();
    time.setDate(time.getDate() - i);
    if (
      History.filter(
        (entry) =>
          new Date(entry.Date).toLocaleDateString("en-US") ===
          time.toLocaleDateString("en-US")
      ).length === 0
    ) {
      History.push({
        Date: time.toISOString(),
        value: null,
      });
    }
  }
  console.log(History);
  const [Cigs, setCigs] = useState(0);
  useEffect(() => {
    updateHistory();
    setHistory(History.sort((a, b) => new Date(a.Date) - new Date(b.Date)));
  }, []);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wholebackground}></div>
        <div className={` ${styles.textfont} ${styles.covanta}`}>
          <h2>BreatheEasy</h2>
        </div>
        <div>
          <a href="homepage" className={`${styles.returnshome}`}>
            Return to Homepage
          </a>
        </div>

        <h1 className={styles.heading}>Tracker</h1>
        <div className={styles.inputheader}>Cigarettes Smoked Today</div>
        <div className={styles.trackercont}>
          <button
            className={styles.buttonminus}
            onClick={() => {
              document.getElementById("cigs").value =
                parseInt(document.getElementById("cigs").value) - 1;
              document.getElementById("cigs").value = Math.max(
                0,
                document.getElementById("cigs").value
              );
              setCigs(document.getElementById("cigs").value);
            }}
          >
            -
          </button>
          <input
            type="number"
            id="cigs"
            placeholder="Cigarettes Smoked Today"
            min={0}
            defaultValue={0}
            className={styles.ciginput}
            onChange={(event) => {
              setCigs(event.target.value);
            }}
          ></input>
          <button
            className={`${styles.button} ${styles.buttonplus}`}
            onClick={() => {
              document.getElementById("cigs").value =
                parseInt(document.getElementById("cigs").value) + 1;
              setCigs(document.getElementById("cigs").value);
            }}
          >
            +
          </button>
        </div>
        <button
          onClick={() => {
            addEntry();
          }}
        >
          Submit
        </button>
        <button
          onClick={() => {
            fetch("/api/addmockdata", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                console.log(data);
                setHistory(data.history);
              });
          }}
        >
          Add mock data
        </button>
        <div className={styles.cont}>
          <h2
            style={{
              textAlign: "center",
            }}
          >
            Your Cigarettes Use in Numbers
          </h2>
          <div className={styles.stats}>
            <div className={styles.statbox}>
              Cigarettes Smoked:{" "}
              {History.reduce((acc, entry) => acc + entry.value, 0)}
            </div>
            <div className={styles.statbox}>
              Average Cigarettes Smoked:{" "}
              {Math.round(
                History.reduce((acc, entry) => acc + entry.value, 0) /
                  History.length
              )}
            </div>
            <div className={styles.statbox}>
              Cost of Cigarettes: $
              {Math.round(
                History.reduce((acc, entry) => acc + entry.value, 0) * 9.0
              )}
            </div>
          </div>
          <div className={styles.stats}>
            <div className={styles.widestatbox}>
              <VictoryChart theme={VictoryTheme.material} width={900}>
                <VictoryAxis
                  tickLabelComponent={<VictoryLabel angle={-75} />}
                />
                <VictoryAxis dependentAxis />
                <VictoryStack colorScale="warm">
                  <VictoryLine
                    data={History.sort((a, b) => new Date(a.Date) - new Date(b.Date)).slice(0, Math.min(History.length, 45)).map(
                      (entry) => {
                        if (entry.value) {
                          return {
                            x: new Date(entry.Date).toLocaleDateString("en-US"),
                            y: entry.value,
                          };
                        } else {
                          return {
                            x: new Date(entry.Date).toLocaleDateString("en-US"),
                            y: 0,
                          };
                        }
                      }
                    )}
                  />
                </VictoryStack>
              </VictoryChart>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr ",
          }}
        >
          {History.reverse().map((entry) => {
            return (
              <div
                className={entry.value ? styles.entry : styles.missedentry}
                key={entry.Date}
              >
                <div className={styles.date}>
                  {new Date(entry.Date).toLocaleDateString("en-US")}
                </div>
                <div className={styles.cigs}>
                  {entry.value ? entry.value : "missed"}
                </div>
                {!entry.value ? (
                  <>
                    <input
                      type="number"
                      placeholder={
                        "Cigarettes Smoked On " +
                        new Date(entry.Date).toLocaleDateString("en-US")
                      }
                      min={0}
                      defaultValue={0}
                      id={
                        "amount" +
                        new Date(entry.Date).toLocaleDateString("en-US")
                      }
                    ></input>
                    <button
                      onClick={() => {
                        fetch("/api/addentry", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            date: new Date(entry.Date).toISOString(),
                            cigs: document.getElementById(
                              "amount" +
                                new Date(entry.Date).toLocaleDateString("en-US")
                            ).value,
                          }),
                        })
                          .then((response) => {
                            return response.json();
                          })
                          .then((data) => {
                            setHistory(data.history);
                          });
                      }}
                    >
                      Submit
                    </button>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

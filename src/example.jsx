import React, { Fragment, useCallback, useState } from "react";
import ReactDom from "react-dom";
import { CalendarInput } from "./app";

import style from "./style.css";

export const Example = () => {
  const [firstDate, setFirstDate] = useState(new Date());
  const [secondDate, setSecondDate] = useState(new Date(2007, 1, 1));
  const [thirdDate, setThirdDate] = useState(new Date());
  const [fourthDate, setFourthDate] = useState(new Date());

  const [zIndexFirst, setZIndexFirst] = useState(1);
  const [zIndexSecond, setZIndexSecond] = useState(1);
  const [zIndexThird, setZIndexThird] = useState(1);

  const handleFirstChange = useCallback((value) => setFirstDate(value), []);
  const handleSecondChange = useCallback((value) => setSecondDate(value), []);
  const handleThirdChange = useCallback((value) => setThirdDate(value), []);
  const handleFourthChange = useCallback((value) => setFourthDate(value), []);

  const onOpenFirst = useCallback(() => {
    setZIndexFirst(2);
    setZIndexSecond(1);
    setZIndexThird(1);
  }, []);

  const onOpenSecond = useCallback(() => {
    setZIndexSecond(2);
    setZIndexFirst(1);
    setZIndexThird(1);
  }, []);

  const onOpenThird = useCallback(() => {
    setZIndexThird(2);
    setZIndexFirst(1);
    setZIndexSecond(1);
  }, []);

  return (
    <Fragment>
      <header className={style.header}>
        <h1 className={style.h1}>Date Picker aka Calendar Widget</h1>
      </header>
      <main className={style.main}>
        <section className={style.section}>
          <h2 className={style.h2}>Default calendar input field</h2>
          <ol className={style.list}>
            <li className={style.item}>
              <span>It displays today&apos;s date by default: </span>
              <CalendarInput
                value={firstDate}
                onChange={handleFirstChange}
                zIndex={zIndexFirst}
                onOpen={onOpenFirst}
              />
            </li>
            <li className={style.item}>
              <span>
                With prop{" "}
                <code className={style.code}>
                  value=&#123;new Date(2007, 1, 1)&#125;
                </code>
                :{" "}
              </span>
              <CalendarInput
                value={secondDate}
                onChange={handleSecondChange}
                zIndex={zIndexSecond}
                onOpen={onOpenSecond}
              />
            </li>
            <li className={style.item}>
              <span>
                With prop <code className={style.code}>isOpened</code>:{" "}
              </span>
              <CalendarInput
                value={thirdDate}
                onChange={handleThirdChange}
                zIndex={zIndexThird}
                onOpen={onOpenThird}
                isOpened
              />
            </li>
          </ol>
        </section>
        <section className={style.section}>
          <span>To test scroll effect: </span>
          <CalendarInput
            value={fourthDate}
            onChange={handleFourthChange}
            isOpened
          />
          <article className={style.article}>
            <h2 className={style.h2}>Props</h2>
            <ol className={style.list}>
              <li className={style.item}>
                <span>
                  <code className={style.code}>value</code> -{" "}
                  <strong>Required</strong> instance of Date e.g. Date() value
                </span>
              </li>
              <li className={style.item}>
                <span>
                  <code className={style.code}>onChange</code> -{" "}
                  <strong>Required</strong> change handler for value; accepts
                  one argument - instance of Date
                </span>
              </li>
              <li className={style.item}>
                <span>
                  <code className={style.code}>isOpened</code> -{" "}
                  <strong>Optional</strong> if{" "}
                  <code className={style.code}>true</code> calendar widget will
                  be opened by default
                </span>
              </li>
              <li className={style.item}>
                <span>
                  <code className={style.code}>zIndex</code> -{" "}
                  <strong>Optional</strong> default = 1
                </span>
              </li>
              <li className={style.item}>
                <span>
                  <code className={style.code}>onOpen</code> -{" "}
                  <strong>Optional</strong> Triggers when calendar widget opens
                </span>
              </li>
              <li className={style.item}>
                <span>
                  <code className={style.code}>onClose</code> -{" "}
                  <strong>Optional</strong> Triggers when calendar widget closes
                </span>
              </li>
            </ol>
            <div>
              <h2 className={style.h2} style={{ marginBottom: "10px" }}>
                Usage
              </h2>
              <code className={style.code}>&lt;CalendarInput</code>
              <ul style={{ paddingLeft: "50px", listStyle: "none" }}>
                <li>
                  <code className={style.code}>value=&#123;value&#125;</code>
                </li>
                <li>
                  <code className={style.code}>
                    onChange=&#123;this.handleChange&#125;
                  </code>
                </li>
                <li>
                  <code className={style.code}>zIndex=&#123;2&#125;</code>
                </li>
                <li>
                  <code className={style.code}>
                    onOpen=&#123;this.handleOpen&#125;
                  </code>
                </li>
                <li>
                  <code className={style.code}>
                    onClose=&#123;this.handleOpen&#125;
                  </code>
                </li>
                <li>
                  <code className={style.code}>isOpened</code>
                </li>
              </ul>
              <code className={style.code}>/&gt;</code>
            </div>
            <div>
              <h2 className={style.h2}>Supports</h2>
              <ul className={style.list}>
                <li>IE</li>
                <li>Edge</li>
                <li>Firefox</li>
                <li>Chrome</li>
                <li>Opera</li>
                <li>
                  <i>Safari</i> - <strong>Not tested</strong>
                </li>
              </ul>
            </div>
          </article>
        </section>
      </main>
      <footer className={style.footer}>
        Author: <a href="https://github.com/obergodmar">obergodmar</a> Github:{" "}
        <a href="https://github.com/obergodmar/calendar-widget">repo</a>
      </footer>
    </Fragment>
  );
};

ReactDom.render(<Example />, document.getElementById("example"));

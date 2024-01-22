import TestBox, { ITestBoxProps } from "../../Common/TestBox";
import tests from "../../data/AvailableTests.json";
import Blackdrop from "../../Common/Blackdrop";
import TestDetails from "./TestDetails";
import { useState } from "react";

export default function TestSection() {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const availableTests: ITestBoxProps[] = tests.tests;
  const testElements = availableTests.map((item, index) => (
    <TestBox
      iconClasses={item.iconClasses}
      titleBox={item.titleBox}
      linkTest={item.linkTest}
      key={index}
    />
  ));

  return (
    <>
      {showBackdrop && (
        <Blackdrop onClose={() => setShowBackdrop(false)}>
          <TestDetails />
        </Blackdrop>
      )}
      <section className="section-tests section-between">
        <div className="section-tests__helper">
          <div
            className="btn--cleared helper-btn"
            onClick={() => {
              setShowBackdrop((oldState) => !oldState);
            }}
          >
            <i className="fas fa-question-circle" />
          </div>
        </div>
        <div className="u-center-text u-margin-bottom-medium">
          <h2 className="heading-secondary heading-secondary--dark-color">
            Testează-ți cunoștiințele !
          </h2>
        </div>
        <div className="flex-row--centered">{testElements}</div>
      </section>
    </>
  );
}

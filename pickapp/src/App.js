import React, { useState } from "react";

const App = () => {
  const defaultChoices = ["1213", "20291", "4096", "2002"];
  const defaultPeople = ["안수빈", "노승욱", "정길연", "전지수"];

  const [choices, setChoices] = useState([...defaultChoices]);
  const [people, setPeople] = useState([...defaultPeople]);
  const [pickedChoices, setPickedChoices] = useState({});
  const [randomOrder, setRandomOrder] = useState([]);
  const [presentationOrder, setPresentationOrder] = useState([]);

  const handleUpdateChoices = (index, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  const handleAddChoice = () => {
    setChoices([...choices, "추가된 문제"]);
  };

  const handleRemoveChoice = (index) => {
    const updatedChoices = [...choices];
    updatedChoices.splice(index, 1);
    setChoices(updatedChoices);
  };

  const handleAddPerson = () => {
    setPeople([...people, "추가된 스터디원"]);
  };

  const handleRemovePerson = (index) => {
    const updatedPeople = [...people];
    updatedPeople.splice(index, 1);
    setPeople(updatedPeople);
  };

  const handlePickChoices = () => {
    const remainingChoices = [...choices];

    const updatedPickedChoices = {};
    for (const person of people) {
      const randomIndex = Math.floor(Math.random() * remainingChoices.length);
      updatedPickedChoices[person] = remainingChoices[randomIndex];
      remainingChoices.splice(randomIndex, 1);
    }

    setPickedChoices(updatedPickedChoices);
  };

  const handleRandomOrder = () => {
    const shuffledPeople = [...people].sort(() => Math.random() - 0.5);
    setRandomOrder(shuffledPeople);

    const updatedPresentationOrder = shuffledPeople.map((person, index) => ({
      person,
      order: index + 1,
    }));

    setPresentationOrder(updatedPresentationOrder);
  };

  return (
    <div>
      <h2>문제를 골라보자</h2>
      <ul>
        {choices.map((choice, index) => (
          <li key={index}>
            <input
              type="text"
              value={choice}
              onChange={(e) => handleUpdateChoices(index, e.target.value)}
            />
            <button onClick={() => handleRemoveChoice(index)}>제거하기</button>
          </li>
        ))}
        <li>
          <button onClick={handleAddChoice}>추가하기</button>
        </li>
      </ul>

      <h2>오늘 스터디 누구 참여하니</h2>
      <ul>
        {people.map((person, index) => (
          <li key={index}>
            <input
              type="text"
              value={person}
              onChange={(e) => {
                const updatedPeople = [...people];
                updatedPeople[index] = e.target.value;
                setPeople(updatedPeople);
              }}
            />
            <button onClick={() => handleRemovePerson(index)}>오늘은 안해</button>
          </li>
        ))}
        <li>
          <button onClick={handleAddPerson}>추가하기</button>
        </li>
      </ul>

      <h2>순서를 정해보자</h2>
      <ul>
        {Object.entries(pickedChoices).map(([person, choice]) => (
          <li key={person}>
            {person}: {choice}
          </li>
        ))}
      </ul>

      <button onClick={handlePickChoices}>문제를 정해보자</button>
      <button onClick={handleRandomOrder}>발표 순서를 정하자</button>

      {randomOrder.length > 0 && (
        <div>
          <h2>오늘의 발표 순서입니다.</h2>
          <ol>
            {presentationOrder.map(({ person, order }) => (
              <li key={person}>
                발표 {order}: {person}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default App;

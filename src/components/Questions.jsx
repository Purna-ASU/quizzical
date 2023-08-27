import React, { useState } from "react";

function Questions(props) {
    const { question, options, correctOption, updateScore, answersSubmitted } = props;
    const [selectedOption, setSelectedOption] = useState(null);

    const handleClick = (option) => {
        if (answersSubmitted) {
            return;
        }
        setSelectedOption(option);

        const isCorrect = option === correctOption
        updateScore(isCorrect)
    };

    return (
        <div className="questions-container">
            <h1 className="questions-title">{question}</h1>
            <form className="questions-options">
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={`custom-option 
                            ${(answersSubmitted && option === correctOption) ? "selected-correct" : ""}
                            ${(answersSubmitted && selectedOption === option && option !== correctOption) ? "selected-wrong" : ""}
                            ${(answersSubmitted && option !== correctOption) ? "blur-incorrect" : ""}
                            ${selectedOption === option ? "selected" : ""}`}
                        onClick={() => handleClick(option)}
                    >
                        {option}
                    </div>
                ))}
            </form>
        </div>
    );
}

export default Questions;
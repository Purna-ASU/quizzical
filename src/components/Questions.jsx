import React, { useState } from "react";

function Questions(props) {
    const { question, options, correctOption } = props;
    const [selectedOption, setSelectedOption] = useState(null);

    const handleClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="questions-container">
            <h1 className="questions-title">{question}</h1>
            <form className="questions-options">
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={`custom-option ${selectedOption === option ? "selected" : ""}`}
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

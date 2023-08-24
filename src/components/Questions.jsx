import React from "react";

function Questions(props) {
    const { question, options, correctOption } = props;

    return (
        <div>
            <h1 className="questions-title">{question}</h1>
            <p className="questions-options">
                {options.map((option, index) => (
                    <span key={index}>{option}</span>
                ))}
            </p>
        </div>
    );
}


export default Questions;

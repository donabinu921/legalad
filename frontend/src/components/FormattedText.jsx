import React from "react";

const FormattedText = ({ text }) => {

    const parseTextToSections = (input) => {
    const sections = input.split(/\*\*(.*?)\*\*/g);
    const parsedSections = [];

    for (let i = 0; i < sections.length; i++) {
      if (i % 2 === 1) {
        parsedSections.push({
          heading: sections[i].trim(),
          content: sections[i + 1]?.trim() || "",
        });
      }
    }

    return parsedSections;
  };

  const textFormat = parseTextToSections(text)

  return (
    <div>
      {textFormat.map((textFormat, index) => (
        <section key={index} style={{ marginBottom: "20px" }}>
          {textFormat.heading && <h2>{textFormat.heading}</h2>}
          <p>{textFormat.content}</p>
        </section>
      ))}
    
    
    </div>
  );
};

export default FormattedText;

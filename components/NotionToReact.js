import React from "react";

export function NotionToText(items) {
  return items
    ? items
        .map((item) => {
          return item.plain_text;
        })
        .join(" ")
    : "";
}

function NotionToReact({ component }) {
  return (
    <>
      {component.map((item) => {
        let text = item.annotations.bold ? (
          <strong>{item.text.content}</strong>
        ) : (
          item.text.content
        );
        text = item.annotations.italic ? <i>{text}</i> : text;
        text = item.annotations.underline ? <u>{text}</u> : text;

        if (item.text.link) {
          return (
            <a
              href={item.link}
              target="_blank"
              key={Math.random()}
              rel="noreferrer"
            >
              {text}
            </a>
          );
        }
        return text;
      })}
    </>
  );
}

export default NotionToReact;

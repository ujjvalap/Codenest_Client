import moment from "moment";

export const LANGUAGE_VERSIONS = {
  cpp: "10.2.0",
  javascript: "18.15.0",
  python: "3.10.0",
  java: "15.0.2",
};

export const CODE_SNIPPETS = {
  javascript: `console.log("Hello World1");`,
  python: `print("Hello World")`,
  java: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  cpp: `#include<iostream>\nusing namespace std;\n\nint main(){\n\n\tcout<<"Hello World";\n\n\treturn 0;\n}`,
};

export const formatTime = (time) => {
  const duration = moment.duration(time, "milliseconds");

  const days = duration.days();
  const hours = String(duration.hours()).padStart(2, "0");
  const minutes = String(duration.minutes()).padStart(2, "0");
  const seconds = String(duration.seconds()).padStart(2, "0");

  // Conditional formatting
  return days > 0
    ? `${days}d ${hours}:${minutes}:${seconds}`
    : `${hours}:${minutes}:${seconds}`;
};



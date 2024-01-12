import React from "react";

function StatusIcon() {
  return (
    <svg
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 24"
      width="1em"
      height="1em"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: "\n\t\t.s0 { fill: currentColor } \n\t",
        }}
      />
      <path
        id="Layer"
        fillRule="evenodd"
        className="s0"
        d="m6.8 15h-6.8v-1h6.2l2.4-3.5 3 6 1.6-2.5h4.8v1h-4.2l-2.4 3.5-3-6zm15.3-7.7v16.7h-20v-7h1v6h18v-15h-7v-7h-9.5c-0.9 0-1.5 0.7-1.5 1.5v9.5h-1v-9.5c0-1.4 1.1-2.5 2.5-2.5h10.2zm-7-0.3h5.3l-5.3-5.3z"
      />
    </svg>
  );
}

export default StatusIcon;

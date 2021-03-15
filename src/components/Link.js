import React from "react";

const Link = ({ link }) => {
  const { description, url } = link;
  return (
    <div>
      <div>
        {description} ({url})
      </div>
    </div>
  );
};

export default Link;

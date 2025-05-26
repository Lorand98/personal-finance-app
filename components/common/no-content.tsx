import React from "react";

const NoContent = ({ contentType }: { contentType: string }) => (
  <div className="py-6 rounded-xl">
    <p className="text-grey-500 text-xl">
      You have no
      {contentType} yet.
    </p>
  </div>
);

export default NoContent;

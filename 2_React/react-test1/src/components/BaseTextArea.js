import React, { forwardRef } from "react";

const BaseTextArea = forwardRef((props, ref) => {
  const { className, ...restProps } = props;
  return <textarea ref={ref} {...restProps} />;
});

export default BaseTextArea;

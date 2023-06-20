"use client";

import { ReactElement } from "react";

const Container = ({ children }: { children: ReactElement }) => {
  return <div className="p-4">{children}</div>;
};

export default Container;

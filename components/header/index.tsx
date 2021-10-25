import React, { FC } from "react";
import { NextPage, NextComponentType } from "next";
import AppBar from "./AppBar";
import CategoryBar from "./CategoryBar";

const Header: FC = () => {
  return (
    <>
      <AppBar />
      <CategoryBar />
    </>
  );
};

export default Header;

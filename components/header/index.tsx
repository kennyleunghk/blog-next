import React, { FC, useEffect } from "react";
import { useHttp } from "../../hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import { authActions } from "../../store/slices/auth-slice";
import { postActions } from "../../store/slices/post-slice";
import AppBar from "./HeaderBar";
import CategoryBar from "./CategoryBar";
import { CategoryModel } from "../../models/CategoryModel";
import { rootState } from "../../store";

const Header: FC = () => {
  const dispatch = useDispatch();
  const cates = useSelector((state: rootState) => state.posts.categories);
  useEffect(() => {
    console.log(cates);
  }, [cates]);

  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const categories: any = await useHttp(
          "get",
          "http://kennyleung-blog.sytes.net:9321/api/LoadData/categories",
          null
        );
        if (categories) {
          dispatch(postActions.setCategories(categories));
        }
      } catch (error) {}
    };
    fetchInitData();

    const storedToken: any = localStorage.getItem("token");
    if (storedToken !== undefined && storedToken !== null) {
      const token = storedToken.split(" ");
      const expired: any = jwt.decode(token[1]);
      if (expired) {
        if (expired.exp > Math.floor(Date.now() / 1000)) {
          dispatch(authActions.isLoggedIn());
        }
      }
    }
  }, []);

  return (
    <>
      <AppBar />
      {/* <CategoryBar /> */}
    </>
  );
};

export default Header;

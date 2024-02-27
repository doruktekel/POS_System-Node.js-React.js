import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const HomePage = () => {
  return (
    <MainLayout>
      <div className="bg-light rounded-3 mt-4 p-5">
        <h1>Welcome to the simple POS for small business</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, illo
          est, consequuntur eius repellendus praesentium deserunt laboriosam
          suscipit quibusdam dolorem sit ratione laudantium itaque non porro
          neque dicta officia fugiat!
        </p>
        <p>If you have an issue call 444-444-444 anytime</p>
        <Link to="/pos" className="btn  btn-primary">
          Click to sell products
        </Link>
      </div>
    </MainLayout>
  );
};

export default HomePage;

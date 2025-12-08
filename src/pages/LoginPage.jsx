import React from 'react';
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="card w-full max-w-md bg-base-200 shadow-xl">
        <div className="card-body items-center text-center p-10">
          <h2 className="card-title text-4xl font-bold mb-4">Welcome back.</h2>
          <p className="mb-8 text-base-content-secondary">Sign in to access your account and join the conversation.</p>
          <form className="w-full">
            <div className="form-control w-full mb-4">
              <input
                type="text"
                placeholder="Your username"
                className="input input-bordered w-full input-lg"
              />
            </div>
            <div className="form-control w-full">
              <input
                type="password"
                placeholder="Your password"
                className="input input-bordered w-full input-lg"
              />
              <label className="label mt-2">
                <a href="#" className="label-text-alt link link-hover text-base-content-secondary">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-8">
              <button className="btn btn-primary btn-lg w-full">Sign In</button>
            </div>
          </form>
          <div className="divider my-8">OR</div>
          <button className="btn btn-outline btn-lg w-full">
            <FaGoogle className="fill-current mr-2">/</FaGoogle>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
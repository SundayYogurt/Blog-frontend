import React from 'react';
import { FaGoogle } from "react-icons/fa";
const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="card w-full max-w-md bg-base-200 shadow-xl">
        <div className="card-body items-center text-center p-10">
          <h2 className="card-title text-4xl font-bold mb-4">Join our community.</h2>
          <p className="mb-8 text-base-content-secondary">Create an account to start writing and sharing your ideas.</p>
          <form className="w-full">
            <div className="form-control w-full mb-4">
              <input
                type="text"
                placeholder="Choose a username"
                className="input input-bordered w-full input-lg"
              />
            </div>
            <div className="form-control w-full">
              <input
                type="password"
                placeholder="Create a password"
                className="input input-bordered w-full input-lg"
              />
            </div>
            <div className="form-control mt-8">
              <button className="btn btn-primary btn-lg w-full">Register</button>
            </div>
          </form>
          <div className="divider my-8">OR</div>
          <button className="btn btn-outline btn-lg w-full">
            <FaGoogle className="fill-current mr-2">/</FaGoogle>
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
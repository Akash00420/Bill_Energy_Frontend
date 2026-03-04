import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-top">
          <div className="auth-icon">⚡</div>
          <h2>Welcome Back</h2>
          <p>Login to view your energy insights</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <span className="text-red">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
              />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {errors.password && <span className="text-red">{errors.password.message}</span>}
          </div>

          <div className="auth-options">
            <label className="remember-label">
              <input type="checkbox" /> Remember me
            </label>
            <span className="forgot-password">Forgot Password?</span>
          </div>

          <button type="submit" className="btn-primary">Login</button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register" className="auth-link">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
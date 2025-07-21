import { useState } from "react";

const InputField = ({ type, placeholder, icon, value, onChange }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (isPasswordShown ? 'text' : 'password') : type;

  return (
    <div className="input-wrapper">
      <input
        type={inputType}
        placeholder={placeholder}
        className="input-field"
        required
        value={value}           // ✅ Truyền giá trị từ state
        onChange={onChange}     // ✅ Truyền sự kiện cập nhật state
      />

      <i className={`fas fa-${icon}`}></i>

      {isPassword && (
        <i
          className={`fas ${isPasswordShown ? 'fa-eye-slash' : 'fa-eye'} eye-icon`}
          onClick={() => setIsPasswordShown(prev => !prev)}
        ></i>
      )}
    </div>
  );
};

export default InputField;

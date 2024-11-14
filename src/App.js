import './App.css';
import {useState} from "react";

function App() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    validateField(name);
  };

  const validateField = (fieldName) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'firstName':
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        else delete newErrors.firstName;
        break;
      case 'lastName':
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        else delete newErrors.lastName;
        break;
      case 'email':
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (formData.email && !emailPattern.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        } else {
          delete newErrors.email;
        }
        // 如果 email 沒填寫且 phone 也沒填寫，顯示錯誤
        if (!formData.email && !formData.phone) {
          newErrors.email = 'Either email or phone number is required';
          newErrors.phone = 'Either email or phone number is required';
        }
        break;
      case 'phone':
        const phonePattern = /^\+852\d{8}$/;
        if (formData.phone && !phonePattern.test(formData.phone)) {
          newErrors.phone = 'Phone number must be in +852 format';
        } else {
          delete newErrors.phone;
        }
        // 如果 phone 沒填寫且 email 也沒填寫，顯示錯誤
        if (!formData.phone && !formData.email) {
          newErrors.email = 'Either email or phone number is required';
          newErrors.phone = 'Either email or phone number is required';
        }
        break;
      case 'password':
        if (!formData.password) newErrors.password = 'Password is required';
        else delete newErrors.password;
        break;
      case 'confirmPassword':
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
        if (formData.password !== formData.confirmPassword) {
          newErrors.password = 'Passwords do not match';
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    const phonePattern = /^\+852\d{8}$/;
    if (formData.phone && !phonePattern.test(formData.phone)) {
      newErrors.phone = 'Phone number must be in +852 format';
    }

    if (!formData.email && !formData.phone ) {
      newErrors.email = 'Either email or phone number is required';
      newErrors.phone = 'Either email or phone number is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.password = 'Passwords do not match';
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(`表單已提交成功!Form Data: ${JSON.stringify(formData)}`);
    } else {
      alert('請檢查所有欄位的輸入格式。');
    }
  };

  return (
      <form className="user-data-form" onSubmit={handleSubmit}>
        <h2>User Data</h2>
        <hr />

        <div className="form-section">
          <h3>Profile Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>First Name*</label>
              <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.firstName ? 'error-input' : ''}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label>Last Name*</label>
              <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.lastName ? 'error-input' : ''}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
              >
                <option value="">Select</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  max={new Date().toISOString().split("T")[0]}
                  className={errors.dateOfBirth ? 'error-input' : ''}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Login Information</h3>
          <p>Choose one login method to input – either email address or phone number</p>
          <div className="form-row">
            <div className="form-group">
              <label>Email Address*</label>
              <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email ? 'error-input' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.phone ? 'error-input' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label>Password *</label>
              <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.password ? 'error-input' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            <div className="form-group">
              <label>Confirm Password *</label>
              <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.confirmPassword ? 'error-input' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
  );

}

export default App;

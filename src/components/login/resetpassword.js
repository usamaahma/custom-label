import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useLocation to read query params and useNavigate for redirecting
import { message, Input, Button, Row, Col, Space } from 'antd'; // Ant Design components
import { resetpassword } from "../../utils/axios";
import './resetpassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { search } = useLocation(); // Get the query string from the URL
  const navigate = useNavigate(); // To navigate to another page

  // Extract token and redirectTo from URL query string
  const params = new URLSearchParams(search);
  const token = params.get('token');
  const redirectTo = params.get('redirectTo') || '/reset-password'; // Default to /reset-password if no redirectTo

  useEffect(() => {
    if (!token) {
      message.error('Invalid reset link');
      return;
    }

    // Navigate to the reset password page if necessary
    if (redirectTo) {
      navigate(redirectTo); // This will redirect to the correct page
    }
  }, [token, redirectTo, navigate]);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      message.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Call the resetPassword API using the post method
      const response = await resetpassword.post('/', { token, password });
      message.success(response.data.message);
      
      // After successful password reset, navigate to another page if needed
      if (redirectTo) {
        navigate(redirectTo); // Redirect to the specified page (e.g., login page or home)
      }
    } catch (error) {
      message.error('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <Row
        justify="center"
        align="middle"
        style={{
          height: '60vh', // Make sure it's full screen height
          marginTop: '0',  // No margin at the top, just center the content
        }}
      >
        <Col xs={24} sm={16} md={12} lg={8} xl={6}>
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Reset Password</h2>

            {/* Input Fields */}
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <Input.Password
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input.Password
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="primary"
                onClick={handleResetPassword}
                loading={loading}
                style={{ width: '100%' }}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ResetPassword;

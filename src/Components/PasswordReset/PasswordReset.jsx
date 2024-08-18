import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function PasswordReset() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1: Send reset code to email
  async function handleSendResetCode() {
    if (!email) {
      toast.error('Please enter your email.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email });
      toast.success('Reset code has been sent to your email.');
      setStep(2); // Move to the next step
    } catch (error) {
      toast.error('Failed to send reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Step 2: Verify reset code
  async function handleVerifyResetCode() {
    if (!resetCode) {
      toast.error('Please enter the reset code.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode });
      toast.success('Reset code verified.');
      setStep(3); // Move to the next step
    } catch (error) {
      toast.error('Invalid reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Step 3: Reset password
  async function handleResetPassword() {
    if (!newPassword) {
      toast.error('Please enter your new password.');
      return;
    }

    setLoading(true);
    try {
      await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        email,
        newPassword,
      });
      toast.success('Password has been reset successfully.');
      // Optionally redirect or reset the process
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-1/2 mx-auto p-20">
      <h1 className="text-3xl my-5 text-center">Reset Password</h1>
      {step === 1 && (
        <div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block py-3 px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder="Enter your Email"
            />
          </div>
          <button
            onClick={handleSendResetCode}
            disabled={loading}
            className="text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sending...' : 'Send Reset Code'}
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              className="block py-3 px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder="Enter the Reset Code"
            />
          </div>
          <button
            onClick={handleVerifyResetCode}
            disabled={loading}
            className="text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Verifying...' : 'Verify Reset Code'}
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block py-3 px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder="Enter your New Password"
            />
          </div>
          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface AuthUser {
  id: string;
  email: string;
  fullName: string;
}

interface RegistrationData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  otpMethod: 'email' | 'sms' | 'whatsapp' | null;
}

interface AuthContextType {
  user: AuthUser | null;
  isRegistering: boolean;
  registrationStep: number;
  registrationData: RegistrationData;
  updateRegistrationData: (data: Partial<RegistrationData>) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetRegistration: () => void;
  verifyOTP: (otp: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(0);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    otpMethod: null,
  });
  const [isHydrated, setIsHydrated] = useState(false);

  // Load registration state and user from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('registrationData');
    const savedStep = localStorage.getItem('registrationStep');
    const savedIsRegistering = localStorage.getItem('isRegistering');
    const savedUser = localStorage.getItem('user');

    if (savedData) setRegistrationData(JSON.parse(savedData));
    if (savedStep) setRegistrationStep(parseInt(savedStep));
    if (savedIsRegistering) setIsRegistering(JSON.parse(savedIsRegistering));
    if (savedUser) setUser(JSON.parse(savedUser));

    setIsHydrated(true);
  }, []);

  // Save registration state and user to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem('registrationData', JSON.stringify(registrationData));
    localStorage.setItem('registrationStep', registrationStep.toString());
    localStorage.setItem('isRegistering', JSON.stringify(isRegistering));
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [registrationData, registrationStep, isRegistering, user, isHydrated]);

  const updateRegistrationData = useCallback((data: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({ ...prev, ...data }));
  }, []);

  const nextStep = useCallback(() => {
    setRegistrationStep(prev => prev + 1);
  }, []);

  const previousStep = useCallback(() => {
    setRegistrationStep(prev => Math.max(0, prev - 1));
  }, []);

  const resetRegistration = useCallback(() => {
    setIsRegistering(false);
    setRegistrationStep(0);
    setRegistrationData({
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      otpMethod: null,
    });
    localStorage.removeItem('registrationData');
    localStorage.removeItem('registrationStep');
    localStorage.removeItem('isRegistering');
  }, []);

  const verifyOTP = useCallback(async (otp: string): Promise<boolean> => {
    // Simulate OTP verification (in real app, this would call a backend API)
    return new Promise<boolean>(resolve => {
      setTimeout(() => {
        if (otp === '1234') {
          const newUser: AuthUser = {
            id: Math.random().toString(36).substr(2, 9),
            email: registrationData.email,
            fullName: registrationData.fullName,
          };
          setUser(newUser);
          resetRegistration();
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  }, [registrationData.email, registrationData.fullName, resetRegistration]);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate login (in real app, this would call a backend API)
    return new Promise<boolean>(resolve => {
      setTimeout(() => {
        const newUser: AuthUser = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          fullName: email.split('@')[0],
        };
        setUser(newUser);
        resolve(true);
      }, 500);
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isRegistering,
        registrationStep,
        registrationData,
        updateRegistrationData,
        nextStep,
        previousStep,
        resetRegistration,
        verifyOTP,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

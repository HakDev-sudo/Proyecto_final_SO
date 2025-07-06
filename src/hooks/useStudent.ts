
import { useState, useEffect } from 'react';

export const useStudent = () => {
  const [studentName, setStudentName] = useState<string>('');
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);

  useEffect(() => {
    const savedName = localStorage.getItem('studentName');
    if (savedName) {
      setStudentName(savedName);
      setIsOnboarded(true);
    }
  }, []);

  const completeOnboarding = (name: string) => {
    setStudentName(name);
    setIsOnboarded(true);
    localStorage.setItem('studentName', name);
  };

  const resetStudent = () => {
    setStudentName('');
    setIsOnboarded(false);
    localStorage.removeItem('studentName');
  };

  return {
    studentName,
    isOnboarded,
    completeOnboarding,
    resetStudent
  };
};

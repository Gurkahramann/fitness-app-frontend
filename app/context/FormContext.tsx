// app/context/FormContext.tsx
import React, { createContext, useState, useContext } from 'react';

type FormData = {
  firstName: string;
  lastName: string;
  gender: string;
  height: string;
  weight: string;
  birthDate: string;
  activityLevel: string;
  interestArea: string;
};

const defaultFormData: FormData = {
  firstName: '',
  lastName: '',
  gender: '',
  height: '',
  weight: '',
  birthDate: '',
  activityLevel: '',
  interestArea: '',
};

type FormContextType = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormProvider');
  }
  return context;
};

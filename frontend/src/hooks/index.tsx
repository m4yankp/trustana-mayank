import React from 'react';
import { Type } from 'typescript';

export function useFormFields<T>(initialValues: T) {
  const [formFields, setFormFields] = React.useState<T>(initialValues);
  const createChangeHandler = (key: keyof T) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setFormFields((prev: T) => ({ ...prev, [key]: value }));
  };
  const setValue = (key: keyof T, value: any) => {
      console.log("Called");
    setFormFields((prev: T)  => ({ ...prev, [key]: value }));
    console.log(formFields);
  }
  return { formFields, createChangeHandler, setValue };
}
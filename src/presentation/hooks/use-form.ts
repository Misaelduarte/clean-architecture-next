import { useCallback, useEffect, useState } from 'react';

import { FormValidation } from '@/validation/protocols/form-validation';

type Props = {
  fieldNames: Record<string, string>;
  validation?: FormValidation;
  validationMode?: 'onChange' | 'onSubmit';
  defaultValues?: { [key: string]: any };
};

type FieldValues = Map<string, string | number>;
type FieldErrors = Map<string, string | null>;

export const useForm = ({
  fieldNames,
  validation,
  validationMode = 'onChange',
  defaultValues,
}: Props) => {
  const [values, setValues] = useState<FieldValues>(new Map());
  const [errors, setErrors] = useState<FieldErrors>(new Map());
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [isFormValid, setFormValid] = useState(false);

  const fieldNamesArray = Object.values(fieldNames);

  const hasErrors = (errors: FieldErrors): boolean => {
    return Array.from(errors).some(error => !!error);
  };

  const validateFields = useCallback(
    (onlyTouched = false): boolean => {
      const canValidateField = (fieldName: string): boolean => {
        return !onlyTouched || (onlyTouched && isFieldTouched(fieldName));
      };

      const isFieldTouched = (fieldName: string) => touchedFields.has(fieldName);
      const newErrors: FieldErrors = new Map<string, string | null>();
      let isFormValid = true;
      fieldNamesArray.forEach(fieldName => {
        const fieldErrorMessage = validation?.validate(fieldName, mapToObject(values) || '');
        if (fieldErrorMessage) {
          isFormValid = false;
        }
        if (canValidateField(fieldName)) {
          newErrors.set(fieldName, fieldErrorMessage || null);
        }
      });
      setFormValid(isFormValid);
      setErrors(newErrors);
      return hasErrors(newErrors);
    },
    [fieldNamesArray, touchedFields, validation, values]
  );

  const validateAllFields = useCallback(() => validateFields(), [validateFields]);

  const validateTouchedFields = useCallback(() => validateFields(true), [validateFields]);

  const mapToObject = (map: Map<string, any>) => Object.fromEntries(map);

  const populateFields = useCallback(() => {
    const initialValues: FieldValues = new Map<string, string | number>();
    fieldNamesArray.forEach(fieldName => {
      initialValues.set(fieldName, defaultValues?.[fieldName] || '');
    });
    setValues(initialValues);
  }, [defaultValues, fieldNamesArray]);

  useEffect(() => {
    if (touchedFields.size > 0 && validationMode === 'onChange') {
      validateTouchedFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    populateFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFieldChange = (fieldName: string, value: string | number) => {
    const newValues = new Map(values);
    newValues.set(fieldName, value);
    addToTouchedFields(fieldName);
    setValues(newValues);
  };

  const handleSubmit =
    (handler: (form: any) => any) =>
    (event: React.FormEvent<HTMLFormElement>): Record<string, any> | void => {
      event.preventDefault();
      const isValid = validateAllFields();
      addAllToTouchedFields();
      if (isValid) {
        return handler(mapToObject(values));
      }
    };

  const addToTouchedFields = (fieldName: string) => {
    setTouchedFields(prevTouchedFields => {
      const newTouchedFields = new Set(prevTouchedFields);
      newTouchedFields.add(fieldName);
      return newTouchedFields;
    });
  };

  const addAllToTouchedFields = () => {
    setTouchedFields(new Set(fieldNamesArray));
  };

  const getFieldValue = useCallback(
    (fieldName: string): string | number => {
      return mapToObject(values)[fieldName] || '';
    },
    [values]
  );

  const getFieldError = useCallback(
    (fieldName: string): string | undefined => {
      return mapToObject(errors)[fieldName] || undefined;
    },
    [errors]
  );

  const setFieldValue = useCallback((fieldName: string, value: string | number) => {
    setValues(prevValues => {
      const newValues = new Map(prevValues);
      newValues.set(fieldName, value);
      if (value) {
        addToTouchedFields(fieldName);
      }
      return newValues;
    });
  }, []);

  const setFieldError = useCallback((fieldName: string, error: string) => {
    setErrors(prevErrors => {
      const newErrors = new Map(prevErrors);
      newErrors.set(fieldName, error);
      return newErrors;
    });
  }, []);

  return {
    getFieldValue,
    setFieldValue,
    getFieldError,
    setFieldError,
    handleFieldChange,
    handleSubmit,
    isFormValid,
  };
};

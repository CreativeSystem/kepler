import {
  RefObject, useState, Dispatch, SetStateAction,
} from "react";

import { FormHandles } from "@unform/core";
import * as Yup from "yup";

export default function useValidationState< S, T extends FormHandles>(
  initialvalue:S,
  fieldName: string,
  formRef: RefObject<T>,
  validationSchema: Yup.StringSchema<string>,
): [S, Dispatch<SetStateAction<S>>, ()=>Promise<string|undefined>] {
  const [validationState, setValidationState] = useState(initialvalue);

  const validation = async (): Promise<string|undefined> => {
    try {
      const fieldInput = formRef.current?.getFieldRef(fieldName);
      return await validationSchema.validate(fieldInput.value);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error: any = {};
        error[fieldName] = err.message;
        formRef.current?.setErrors(error);
      }
    }
    return undefined;
  };

  return [validationState, setValidationState, validation];
}

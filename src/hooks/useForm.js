import {useEffect, useMemo, useState} from 'react'

export const useForm = (initialForm={},formValidations={}) => {

  const [values, setValues] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({ });

  const reset=(newFormState=initialForm)=>{
    setValues(newFormState);
  }
  useEffect(() => {
    createValidators();
}, [ values ])
  
  const isFormValid=useMemo(() => {
    
    for (const formValue of Object.keys(formValidation)) {
      if(formValidation[formValue]!==null)return false;
    }
    return true;

  }, [formValidation])

  const handleInputChange=({target})=>{
    const {name,value,type,checked}=target;
    if(type==='checkbox'){
      setValues({
        ...values,
        [name]:checked
    });
    }else{
      setValues({
          ...values,
          [name]:value
      });

    }
    

  }
  const createValidators=()=>{
    const formCheckedValues = {};
      for (const formField of Object.keys( formValidations )) {
          const [ fn, errorMessage ] = formValidations[formField];

          formCheckedValues[`${ formField }Valid`] = fn( values[formField] ) ? null : errorMessage;
      }

      setFormValidation( formCheckedValues );
  }

  return {...values,values,handleInputChange,reset,...formValidation,isFormValid};
}

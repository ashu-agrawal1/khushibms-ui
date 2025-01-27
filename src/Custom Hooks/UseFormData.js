import { useState, useEffect } from "react";

export default function UseFormData(initialData) {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    // Optionally store data in localStorage or sessionStorage
    // localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return [formData, handleChange];
}

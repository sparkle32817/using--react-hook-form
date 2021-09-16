import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Checkbox from "./checkbox";
import Input from "./input";

function Form() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i,
        "Email is invalid",
      )
      .min(10, "Email must be at least 10 characters")
      .max(20, "Email must be at most 20 characters"),
    checkbox: Yup.string().required("This field is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = (data) => console.log(data);

  return (
    <div className="app-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input name="name" {...register("name")} />
          <span>{errors.name?.message}</span>
        </div>
        <Controller
          name="email"
          control={control}
          render={({
            field: { onChange, value, ref },
            fieldState: { error },
          }) => {
            return (
              <Input
                ref={ref}
                value={value}
                error={error}
                onChange={onChange}
              />
            );
          }}
        />
        <Controller
          name="checkbox"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <Checkbox
                label="This is test checkbox"
                value={value}
                error={error}
                onChange={onChange}
              />
            );
          }}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;

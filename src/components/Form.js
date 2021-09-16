import React from "react";
import { useForm, Controller } from "react-hook-form";
import Checkbox from "./checkbox";
import Input from "./input";

function Form() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  console.log({ errors });

  return (
    <div className="app-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            name="name"
            {...register("name", { required: "Name is required" })}
          />
        </div>
        <div>
          <input {...register("exampleRequired", { required: true })} />
          {errors.exampleRequired && <span>This field is required</span>}
        </div>
        <Controller
          name="email"
          control={control}
          render={({
            field: { onChange, value, ref },
            fieldState: { error },
          }) => {
            console.log({ error });
            return (
              <Input
                ref={ref}
                value={value}
                error={error}
                onChange={onChange}
              />
            );
          }}
          rules={{
            required: "Email field is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i,
              message: "Invalid Email",
            },
            minLength: {
              value: 10,
              message: "Input length is more than 10 letters",
            },
            maxLength: {
              value: 20,
              message: "Input length is less than 20 letters",
            },
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
          rules={{ required: true }}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;

import { Formik, Form } from "formik";
import { FlatGreenButton, SelectAccountType, TextField } from "@/components";
import { icons } from "@/constants";
import { SetStateAction, Dispatch, useState } from "react";
import { signupFormValidationSchema } from "@/utilities/validation/form-validations";
import { useSignup } from "@/utilities/api-interactions/user";

type Props = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "",
};

const SignupForm = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, data, isError, isPending, error } = useSignup();

  const createAccount = async (values: SignupDataType) => {
    await mutateAsync({ ...values });
  };

  return (
    <div className="flex flex-col gap-10 ">
      <h2 className="text-3xl font-bold">
        {props.step === 1
          ? "Welcome to Croch"
          : props.step === 2
            ? "Welcome to Croch"
            : props.step === 3
              ? "Enter Your Personal Details"
              : props.step === 4
                ? "Create Your Password"
                : ""}
      </h2>

      <Formik
        initialValues={initialValues}
        onSubmit={createAccount}
        validationSchema={signupFormValidationSchema}
      >
        <Form>
          {props.step === 1 ? (
            <span>
              <SelectAccountType
                name="role"
                label="Select account type"
                data={[
                  {
                    img: icons.customer,
                    value: "Customer",
                    iconHeight: `${177}`,
                    iconWidth: `${172}`,
                  },

                  {
                    img: icons.creative,
                    value: "Creative",
                    iconHeight: `${166}`,
                    iconWidth: `${294}`,
                  },
                ]}
              />

              <FlatGreenButton
                label="Continue"
                onClick={() => props.setStep(2)}
                extraClasses="mt-10"
                type="button"
              />
            </span>
          ) : props.step === 2 ? (
            <span className="flex flex-col gap-8">
              <TextField
                type="text"
                name="email"
                id="email"
                placeholder="Enter your email address"
              />

              <FlatGreenButton
                label="Continue"
                onClick={() => props.setStep(3)}
                type="button"
              />
            </span>
          ) : props.step === 3 ? (
            <span className="flex flex-col gap-8">
              <TextField
                name="firstName"
                id="firstName"
                type="text"
                placeholder="Enter your first name"
              />

              <TextField
                name="lastName"
                id="lastName"
                type="text"
                placeholder="Enter your last name"
              />

              <FlatGreenButton
                label="Continue"
                onClick={() => props.setStep(4)}
                type="button"
              />
            </span>
          ) : props.step === 4 ? (
            <span className="flex flex-col gap-8">
              <TextField
                name="password"
                id="password"
                placeholder="Enter your password"
                passwordField={true}
                type={showPassword ? "text" : "password"}
                togglePasswordVisibilityIcon={() =>
                  setShowPassword((prev) => !prev)
                }
              />

              <TextField
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Re-enter password"
                passwordField={true}
                type={showPassword ? "text" : "password"}
                togglePasswordVisibilityIcon={() =>
                  setShowPassword((prev) => !prev)
                }
              />

              <FlatGreenButton label="Continue" type="submit" />

              {isPending && <p>{isPending}</p>}

              {isError && <p>{error?.message} </p>}
            </span>
          ) : null}
        </Form>
      </Formik>
    </div>
  );
};

export default SignupForm;
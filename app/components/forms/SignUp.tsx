"use client"

import React from "react"
import { FcGoogle } from "react-icons/fc"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import useSignUp from "@/app/hooks/useSignUp"
import Modal from "../shared/Modal"
import Heading from "../addons/Heading"
import Input from "../shared/Input"
import { toast } from "sonner"
import Button from "../addons/Button"
import { createUser } from "@/app/libs/actions/user.actions"
import { signIn } from "next-auth/react"
import useSignIn from "@/app/hooks/useSignIn"


const SignUp = () => {
  const signUpUser = useSignUp();
  const signInUser = useSignIn();
  const [isLoading, setIsLoading] = React.useState(false);

  const { register, handleSubmit, formState: {errors} } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: ''}
  });

  const onSubmit:SubmitHandler<FieldValues> = async(data) => {
    const { email, password, name } = data;
    const newData = { email: email, password: password, name: name }
    setIsLoading(true);
    try {
      await createUser(newData)
      toast.success('Registration successful')
      signUpUser.onClose();
      signInUser.onOpen();
    } catch (error) {
      toast.error('Something went wrong')
    }
    setIsLoading(false);
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Create Account"
        subtitle="Create an account today!"
      />
      <Input 
        id="email"
        label="Email"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id="name"
        label="Name"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const toggleForm = React.useCallback(() => {
    signUpUser.onClose();
    signInUser.onOpen(); 
  },[signInUser, signUpUser]);

  const footerContent = (
    <div className="mt-3 flex gap-4 flex-col">
      <hr/>
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <div className="text-center text-neutral-500 mt-4 font-light ">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>Already have an account?</div>
          <div className="text-neutral-800 cursor-pointer hover:underline" onClick={toggleForm}>Log in</div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={signUpUser.isOpen}
      title="Create Account"
      actionLabel="Continue"
      onClose={signUpUser.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default SignUp
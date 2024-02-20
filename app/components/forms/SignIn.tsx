"use client"

import React from "react"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Modal from "../shared/Modal"
import Heading from "../addons/Heading"
import Input from "../shared/Input"
import toast from "react-hot-toast"
import Button from "../addons/Button"
import useSignIn from "@/app/hooks/useSignIn"
import useSignUp from "@/app/hooks/useSignUp"
import { useRouter } from "next/navigation"


const SignIn = () => {
  const signInUser = useSignIn();
  const signUpUser = useSignUp();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const { register, handleSubmit, formState: {errors} } = useForm<FieldValues>({
    defaultValues: { email: '', password: ''}
  });

  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', {...data, redirect: false})
    .then((callback) => {setIsLoading(false);

      if (callback?.ok) {
        toast.success('Succesfull Logged In');
        router.refresh();
        signInUser.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    });
  }

  const toggleForm = React.useCallback(() => {
    signInUser.onClose(); 
    signUpUser.onOpen();
  },[signInUser, signUpUser]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Login"
        subtitle="Login to your account!"
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
          <div>First time using Nomeo Coliving?</div>
          <div className="text-neutral-800 cursor-pointer hover:underline" onClick={toggleForm}>Create an account</div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={signInUser.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={signInUser.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default SignIn
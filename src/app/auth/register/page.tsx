"use client";
import { schemaSignUp } from "@/app/lib/schema";
import { RegisterSchema } from "@/app/types";
import { Form, Input, Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { PiEyeSlashThin, PiEyeThin } from "react-icons/pi";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(schemaSignUp),
  });

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const router = useRouter();

  const handleToggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data: RegisterSchema) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      if (result.type === "email") {
        setError("email", {
          message: result.error,
        });
      } else {
        setError("root", {
          message: result.error,
        });
      }

      return;
    }

    router.push("/auth/login");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='p-4 w-lg rounded-xl shadow-xl bg-white/50 text-black'>
      <h1 className='block w-full text-2xl font-semibold text-center mb-4'>Daftar Akun</h1>
      {errors.root && <p className='text-primary block w-full text-center'>{errors.root.message}</p>}
      <div className='w-full flex flex-col gap-8'>
        <Controller
          control={control}
          name='name'
          render={({ field, fieldState }) => (
            <Input
              {...field}
              type='text'
              label='Nama'
              size='lg'
              onChange={field.onChange}
              validationBehavior='aria'
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              variant='bordered'
            />
          )}
        />
        <Controller
          control={control}
          name='email'
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label='Email'
              type='email'
              onChange={field.onChange}
              validationBehavior='aria'
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              variant='bordered'
              size='lg'
            />
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label='Password'
              type={isVisible ? "password" : "text"}
              onChange={field.onChange}
              onBlur={field.onBlur}
              validationBehavior='aria'
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              variant='bordered'
              size='lg'
              endContent={
                <button aria-label='toggle password visibility' className='text-lg cursor-pointer' type='button' onClick={handleToggleVisibility}>
                  {isVisible ? <PiEyeThin /> : <PiEyeSlashThin />}
                </button>
              }
            />
          )}
        />
        <Controller
          control={control}
          name='confirmPassword'
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label='Confirm Password'
              type={isVisible ? "password" : "text"}
              onChange={field.onChange}
              onBlur={field.onBlur}
              validationBehavior='aria'
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              variant='bordered'
              size='lg'
              endContent={
                <button aria-label='toggle password visibility' className='text-lg cursor-pointer' type='button' onClick={handleToggleVisibility}>
                  {isVisible ? <PiEyeThin /> : <PiEyeSlashThin />}
                </button>
              }
            />
          )}
        />
        <Button
          type='submit'
          disabled={isSubmitting}
          className={`${isSubmitting ? "bg-gray-500" : "bg-blue-900 cursor-pointer"} font-semibold text-white`}
        >
          {isSubmitting ? "..." : "Daftar"}
        </Button>
      </div>
      <p className='block w-full text-center'>
        Sudah memiliki akun?{" "}
        <Link href='/auth/login' className='font-semibold underline'>
          Masuk
        </Link>
      </p>
    </Form>
  );
}

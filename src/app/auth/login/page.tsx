"use client";
import { Form, Input, Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { SignInFormSchema } from "@/app/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaSignIn } from "@/app/lib/schema";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { PiEyeThin, PiEyeSlashThin } from "react-icons/pi";

export default function LoginPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(schemaSignIn),
  });

  const handleToggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data: SignInFormSchema) => {
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (response?.error) {
      setError("root", {
        message: response.error,
      });
      return;
    }

    const session = await getSession();

    if (!session?.user.role) {
      setError("root", {
        message: "Role tidak sesuai",
      });
      return;
    }

    if (session.user.role === "superadmin") {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/player");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='p-4 w-lg rounded-xl shadow-xl bg-white/50 text-black'>
      <h1 className='block w-full text-2xl font-semibold text-center mb-4'>Login Form</h1>
      {errors.root && <p className='text-primary text-center block w-full'>{errors.root.message}</p>}
      <div className='w-full flex flex-col gap-4'>
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

        <Button type='submit' disabled={isSubmitting} className='bg-blue-900 font-semibold text-white'>
          {isSubmitting ? "..." : "Login"}
        </Button>
      </div>
      <p className='block w-full text-center'>
        Belum memiliki akun?{" "}
        <Link href='/auth/register' className='font-semibold underline'>
          Daftar
        </Link>
      </p>
    </Form>
  );
}

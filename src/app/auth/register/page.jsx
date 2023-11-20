"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// FUNÇÃO QUE FAZ O ENVIO DOS DADOS PARA O BACKEND
function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Senhas diferentes.");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      router.push("/auth/login");
    }
  });
  console.log(errors);

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form action="" onSubmit={onSubmit} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4 text-center">
          Registro
        </h1>
        <label htmlFor="username" className="text-slate-500 mb-2 block">
          Nome:
        </label>
        <input
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Esse campo é obrigatório",
            },
          })}
          className="w-full p-3 rounded block mb-2 bg-slate-900 text-slate-300"
        />
        {errors.username && (
          <span className="text-red-500 text-xs">
            {errors.username.message}
          </span>
        )}
        <label htmlFor="email" className="text-slate-500 mb-2 block">
          E-mail:
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Esse campo é obrigatório",
            },
          })}
          className="w-full p-3 rounded block mb-2 bg-slate-900 text-slate-300"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}
        <label htmlFor="password" className="text-slate-500 mb-2 block">
          Senha:
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Esse campo é obrigatório",
            },
          })}
          className="w-full p-3 rounded block mb-2 bg-slate-900 text-slate-300"
        />
        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}
        <label htmlFor="confirmPassword" className="text-slate-500 mb-2 block">
          Confirmar senha:
        </label>
        <input
          type="confirmPassword"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Esse campo é obrigatório",
            },
          })}
          className="w-full p-3 rounded block mb-2 bg-slate-900 text-slate-300 "
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-xs">
            {errors.confirmPassword.message}
          </span>
        )}
        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;

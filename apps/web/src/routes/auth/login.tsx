import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import { postLogin } from '@/integrations/api/client/auth/post-login'
import { useState } from 'react'
import { setCookie } from 'nookies'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

const formLoginSchema = z.object({
  email: z.string().email('E-mail inválido').min(3, 'E-mail muito curto'),
  password: z.string().min(8, 'Senha muito curta'),
})

async function onSubmitLogin ({ email, password }: z.infer<typeof formLoginSchema>) {
  const response = await postLogin({ email, password }).catch((error) => {
    return {
      message: error.message,
      status: error.status,
    }
  })

  if (response.status !== 200) {
    return {
      success: false,
      message: 'Acesso negado, verifique seu e-mail e senha',
    }
  }

  if ('data' in response) {
    return {
      success: true,
      message: 'Login realizado com sucesso',
      data: response.data,
    }
  }

  return {
    success: false,
    message: 'Não foi possível realizar o login',
  }
}

function RouteComponent () {
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: formLoginSchema,
    },
    onSubmit: async (form) => {
      const response = await onSubmitLogin(form.value)

      console.log(!response.success || !response.data)

      if (!response.success || !response.data) {
        setErrorMessage(response.message ?? 'Ocorreu um erro ao realizar o login')
        return
      }

      setErrorMessage(null)

      setCookie(null, 'accessToken', response.data.accessToken, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      })

      navigate({
        to: '/roons',
        replace: true,
      })
    },
  })

  return (
    <section className='w-screen h-screen flex items-center justify-center bg-background'>
      <main className='p-8 w-full max-w-lg'>
        <div className='border border-border rounded-md p-8 space-y-6'>
          <h2 className='text-4xl text-center tracking-widest'>
            Login
          </h2>

          <hr className='border-border' />

          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            className='flex flex-col gap-6'
          >
            {/* EMAIL */}
            <form.Field name='email'>
              {(field) => (
                <div className='flex flex-col gap-1'>
                  <Label>E-mail</Label>
                  <Input
                    type='email'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(e.target.value)}
                  />

                  {field.state.meta.isTouched &&
                    field.state.meta.errors?.length > 0 && (
                      <span className='text-sm text-destructive'>
                        {field.state.meta.errors[0]?.message}
                      </span>
                  )}
                </div>
              )}
            </form.Field>

            {/* PASSWORD */}
            <form.Field name='password'>
              {(field) => (
                <div className='flex flex-col gap-1'>
                  <Label>Senha</Label>
                  <Input
                    type='password'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(e.target.value)}
                  />

                  {field.state.meta.isTouched &&
                    field.state.meta.errors?.length > 0 && (
                      <span className='text-sm text-destructive'>
                        {field.state.meta.errors[0]?.message}
                      </span>
                  )}
                </div>
              )}
            </form.Field>

            {errorMessage && (
              <div className='text-sm text-destructive p-8 border border-destructive rounded-md'>
                {errorMessage}
              </div>
            )}

            <Button
              type='submit'
              variant='outline'
              className='w-full disabled:opacity-50 disabled:animate-pulse'
              disabled={!form.state.canSubmit}
            >
              Acessar
            </Button>

            <div className='text-center'>
              <Link
                to='/auth/cadastrar'
                className='underline hover:text-ring'
              >
                Cadastrar minha conta
              </Link>
            </div>
          </form>
        </div>
      </main>
    </section>
  )
}

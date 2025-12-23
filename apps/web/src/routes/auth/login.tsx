import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createFileRoute, Link } from '@tanstack/react-router'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

const formLoginSchema = z.object({
  email: z.string().email('E-mail inválido').min(3, 'E-mail muito curto'),
  password: z.string().min(8, 'Senha muito curta'),
})

function RouteComponent () {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: formLoginSchema,
    },
    onSubmit: (values) => {
      console.log(values)
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

            <Button
              type='submit'
              variant='outline'
              className='w-full'
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

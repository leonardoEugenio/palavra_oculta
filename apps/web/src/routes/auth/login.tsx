import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

function RouteComponent () {
  return (
    <section className='w-screen h-screen flex flex-col items-center justify-center bg-background'>
      <main className='p-8 w-full max-w-lg'>
        <div className='border border-border rounded-md size-full p-8'>
          <h2 className='text-4xl text-center tracking-widest'>
            Login
          </h2>
          <hr className='my-4 mx-auto border-border max-w-sm' />
          <form className='flex flex-col gap-6'>
            <div>
              <Label className='mb-2'>
                E-mail
              </Label>
              <Input type='email' />
            </div>
            <div>
              <Label className='mb-2'>
                Senha
              </Label>
              <Input type='password' />
            </div>
            <Button variant='outline' className='w-full'>
              Acessar
            </Button>
            <div className='w-full text-center'>
              <Link to='/auth/cadastrar' className='underline hover:text-ring'>Cadastrar minha conta</Link>
            </div>
          </form>
        </div>
      </main>
    </section>
  )
}

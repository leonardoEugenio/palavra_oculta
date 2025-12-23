import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/cadastrar')({
  component: RouteComponent,
})

function RouteComponent () {
  return <div>Hello "/auth/cadastrar"!</div>
}

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/roons/')({
  component: RouteComponent,
})

function RouteComponent () {
  return (
    <div>
      <h1>Logado</h1>
    </div>
  )
}

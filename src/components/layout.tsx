import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
export const Layout = ({ children }: Props) => {
  return <div className="container">{children}</div>
}

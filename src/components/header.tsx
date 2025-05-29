type HeaderProps = {
  title: string
  subtitle: string
}
export const Header = (props: HeaderProps) => {
  return (
    <header>
      <h1>{props.title}</h1>
      <p className="subtitle">{props.subtitle}</p>
    </header>
  )
}

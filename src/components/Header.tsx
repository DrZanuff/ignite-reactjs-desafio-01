import '../styles/header.scss'

export function Header() {
  const logo = 'https://raw.githubusercontent.com/DrZanuff/ignite-reactjs-desafio-01/c57a4b9a598c09f09106b82359ed3b45a5106014/public/logo.svg'
  return (
    <header className="header">
      <div>
        <img src={logo} alt="to.do"/>
      </div>
    </header>
  )
}
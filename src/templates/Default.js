import Header from '../components/Header'


// children: retorna o conteúdo central da página
const Default = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <footer>FOOTER</footer>
        </>
    )
}

export default Default
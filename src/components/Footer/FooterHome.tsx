import Logo from "../../assets/Slotify Logo.webp"

export const FooterHome = () => {

    return (
        <footer className="pt-16 border-t border-gray-300" id="home-footer">
            <div className="flex flex-col lg:flex-row items-center justify-around lg:px-24 ">
                    <img src={Logo} alt="Slotify" className="h-20 lg:h-24 max-w-96 object-cover" />
                <div className="flex-1 flex justify-center">
                    <p className="mt-6 lg:mt-0 w-2/3 text-center">This app was built to make service booking easier for companies. It helps users schedule appointments quickly and efficiently.</p>

                </div>

                <div className="flex-1 flex flex-col mt-8 lg:mt-0">
                    <h1 className="font-bold">Contact:</h1>
                    <p className="mt-1">Email: filip.jarocki@wp.pl</p>
                    <a className="mt-1 hover:text-blue-400" href="https://filipjarocki.netlify.app/" target="__blank">Creator: filipjarocki.netlify.app</a>
                    <a className="mt-1 hover:text-blue-400" href="https://github.com/Jaros-777" target="__blank">Github: github.com/Jaros-777</a>
                </div>
            </div>
            <p className="w-full text-center py-12">© 2025 Jaros. Made with ❤️</p>

        </footer>
    )
}
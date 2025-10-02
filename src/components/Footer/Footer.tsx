import Logo from "../../assets/Slotify Logo.webp"

export const Footer = () => {

    return (
        <footer className="pt-6">
            <div className="flex justify-around px-24 ">
                <div className=" flex-1 items-center justify-center">
                    <img src={Logo} alt="Slotify" className="h-24" />
                </div>
                <div className="flex-1 flex justify-center">
                    <p className="w-2/3 text-center">This app was built to make service booking easier for companies. It helps users schedule appointments quickly and efficiently.</p>

                </div>

                <div className="flex-1 flex flex-col">
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
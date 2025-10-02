import Logo from "../../assets/Slotify Logo.webp"

export const Footer = () => {

    return (
        <footer>
            <div>
                <img src={Logo} alt="Slotify" />
                <p>About</p>
                <div>
                    <h3>Contact</h3>
                    <p>Email: filip.jarocki@wp.pl</p>
                    <a href="https://filipjarocki.netlify.app/">Creator</a>
                    <a href="https://github.com/Jaros-777">Github</a>
                </div>
            </div>
            <p>All rights reserver Jaros @2025</p>

        </footer>
    )
}
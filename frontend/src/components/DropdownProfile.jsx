import '../styles/Animation.css';

// eslint-disable-next-line react/prop-types
const DropdownProfile = ({ isScrolled }) => {
    const dropdownStyles = {
        position: "absolute",
        top: "4.2rem",
        right: isScrolled ? "7rem" : "1rem",
        background: 'whitesmoke',
        width: "9rem",
        padding: "1rem",
        borderRadius: ".5rem",
        border: "1.5px solid rgb(173, 173, 173)",
    };

    const arrowStyles = {
        content: "",
        position: "absolute",
        top: "-.7rem",
        right: isScrolled ? "1.5rem" : "1.5rem",
        width: "20px",
        height: "20px",
        background:'inherit',
        transform: "rotate(45deg)",
        borderLeft: "1.5px solid rgb(173,173,173)",
        borderTop: "1.5px solid rgb(173, 173, 173)",
    };

    return (
        <div style={dropdownStyles} className="flex flex-col dropDownProfile z-[10001] shadow-md animate-fade-in-up">
            <ul className="flex flex-col gap-4 cursor-pointer">
                <li className="transition-all duration-300 ease-in-out font-semibold hover:text-teal-500">Profile</li>
                <li className="transition-all duration-300 ease-in-out font-semibold hover:text-teal-500">Settings</li>
                <hr/>
                <li className="transition-all duration-300 ease-in-out font-semibold hover:text-teal-500">Logout</li>
            </ul>
            <div style={arrowStyles}></div>
        </div>
    );
    };

export default DropdownProfile;

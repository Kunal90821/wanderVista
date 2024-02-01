import { useState, useEffect, useRef } from 'react'
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
    const [isOpen, setIsOpen] = useState(false);
    const placeholderText = 'Search...';
    const [animatedPlaceholder, setAnimatedPlaceholder] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if(isOpen) {
            let timer;
            let currentIndex = 0;

            const updatePlaceholder = () => {
            if (currentIndex < placeholderText.length) {

                setAnimatedPlaceholder((prev) => prev + placeholderText[currentIndex++]);                
                timer = setTimeout(updatePlaceholder, 150);

            }
        };

            timer = setTimeout(updatePlaceholder,100);  // Initial delay

            return () => {
                clearTimeout(timer);
            };
        } else {
            setAnimatedPlaceholder('');
        }
    }, [isOpen]);

    const handleIconClick = () => {
        setIsOpen(!isOpen);
        if(inputRef.current) inputRef.current.focus();
    };

    return (
        <div className={`h-30 flex cursor-pointer px-4 py-2 bg-transparent rounded-full items-center ${isOpen ? 'shadow-[#0003] border-2 border-gray-300 dark:border-white dark:shadow-[#bebdbd33]' : '' }`}>
            
            <form>
                <input 
                    className={`outline-none border-none font-medium transition-all duration-500 bg-transparent ${isOpen ? 'w-40 text-sm md:text-base md:w-72 ' : 'w-0' }`}  
                    type='text'
                    ref={inputRef}
                    placeholder={animatedPlaceholder}
                />
            </form>
            <div 
                className='ml-2 cursor-pointer dark:text-white transiton-all duration-300 hover:text-teal-600'
                onClick = { handleIconClick }
            >
                    <SearchIcon />
            </div>
        </div>

    );
};

export default Search;
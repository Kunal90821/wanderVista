import { useState, useEffect, useRef } from 'react'
import { FaRegComment } from "react-icons/fa";

const AddComment = () => {
    const [isOpen, setIsOpen] = useState(false);
    const placeholderText = 'Add a comment...';
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
        <div className={`h-14 flex cursor-pointer px-4 bg-transparent rounded-full items-center ${isOpen ? 'shadow-[#424242d3] bg-gray-200 ' : '' }`}>
            
            <form>
                <input
                    className={`outline-none border-none font-medium overflow-hidden transition-all duration-500 bg-transparent py-3 ${isOpen ? 'w-[35rem] text-sm md:text-base' : 'w-0' }`}  
                    type='text'
                    ref={inputRef}
                    placeholder={animatedPlaceholder}
                />
            </form>
            <div 
                className='ml-2 cursor-pointer dark:text-white transiton-all duration-300 hover:text-[#ff215a]'
                onClick = { handleIconClick }
            >
                    <FaRegComment className="ml-3" style={{fontSize:'2rem'}}/>
            </div>
        </div>

    );
};

export default AddComment;
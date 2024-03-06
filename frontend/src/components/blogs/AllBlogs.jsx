import Filter from '../filters/Filter'
import Card from './Card'
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { useState } from 'react';
import '../../styles/Animation.css'

const AllBlogs = () => {
    const [isOpen, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!isOpen);
    };

    return (
        <div className='flex'>
            <div className='grid w-1/4 bg-white rounded-xl mt-20 p-4 ml-32 shadow-lg animate-fade-in-left'>
                <div className='inline-flex ml-8'>
                    <h1 className='text-gray-800 text-xl font-semibold'>
                        Filter
                    </h1>
                    { 
                        !isOpen ? <FilterAltIcon onClick={handleOpen} className='ml-36' /> : <FilterAltOffIcon onClick={handleOpen} className='ml-36' />
                    }
                </div>
                <div className={`px-4 mt-6 ${isOpen ? 'block animate-fade-in-down': 'hidden' }`}>
                    <Filter />
                </div>
            </div>
            <div className='ml-[35%] absolute'>
                <Card />
            </div>
        </div>

    )
}

export default AllBlogs
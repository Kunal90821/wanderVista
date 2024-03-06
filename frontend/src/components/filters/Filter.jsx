import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

// eslint-disable-next-line react-refresh/only-export-components, react/prop-types
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const Filter = () => {
  const [open, setOpen] = React.useState(0);

  const [category, setCategory] = React.useState('');

  const handleCategory = (value) => {
    if(category === value){
      setCategory(null);
    } else {
      setCategory(value);
    }
  };
  
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          Category
        </AccordionHeader>
        <hr />
        <AccordionBody>
          <div>
            <input type="radio" name="category1" id="category1" checked={category === 'category1'} autoComplete="off" className="btn-check"/>
            <label onClick={() => handleCategory('category1')} htmlFor="category1" className="btn bg-green">Category 1</label>
            <input type="radio" name="category2" id="category2" checked={category === 'category2'} autoComplete="off" className="btn-check"/>
            <label onClick={() => handleCategory('category2')} htmlFor="category2" className="btn bg-green">Category 2</label>
            <input type="radio" name="category3" id="category3" checked={category === 'category3'} autoComplete="off" className="btn-check"/>
            <label onClick={() => handleCategory('category3')} htmlFor="category3" className="btn bg-green">Category 3</label>
            <input type="radio" name="category4" id="category4" checked={category === 'category4'} autoComplete="off" className="btn-check"/>
            <label onClick={() => handleCategory('category4')} htmlFor="category4" className="btn bg-green">Category 4</label>
            <input type="radio" name="category5" id="category5" checked={category === 'category5'} autoComplete="off" className="btn-check"/>
            <label onClick={() => handleCategory('category5')} htmlFor="category5" className="btn bg-green">Category 5</label>
            <input type="radio" name="category6" id="category6" checked={category === 'category6'} autoComplete="off" className="btn-check"/>
            <label onClick={() => handleCategory('category6')} htmlFor="category6" className="btn bg-green">Category 6</label>
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          Author
        </AccordionHeader>
        <hr />
        <AccordionBody>
          We&apos;re not always in the position that we want to be at.
          We&apos;re constantly growing. We&apos;re constantly making mistakes.
          We&apos;re constantly trying to express ourselves and actualize our
          dreams.
        </AccordionBody>
      </Accordion>
    </>
  );
}

export default Filter;
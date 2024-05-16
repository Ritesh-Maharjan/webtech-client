import React, { useState, useRef } from "react";

interface Faq {
    id: number;
    header: string;
    text: string;
}

const faqs: Faq[] = [
    {
        id: 1,
        header: "What is Lorem Ipsum?",
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`
    },
    {
        id: 2,
        header: "Where does it come from?",
        text: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. `
    },
    {
        id: 3,
        header: "Why do we use it?",
        text: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,`
    },
    {
        id: 4,
        header: "Where can I get some?",
        text: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`
    }
];

const AccordionItem: React.FC<{ handleToggle: (index: number) => void; active: number | null; faq: Faq }> = ({ handleToggle, active, faq }) => {
    const contentEl = useRef<HTMLDivElement>(null);
    const { header, id, text } = faq;

    return (
        <div className="border border-gray-300 rounded-lg mb-4 overflow-hidden">
            <div className={`flex items-start cursor-pointer justify-between bg-gray-300 transition-all ${active === id ? 'bg-blue-500' : ''}`} onClick={() => handleToggle(id)}>
                <h5 className={`font-medium text-base relative mb-0 ${active === id ? 'text-white' : 'text-gray-700'} transition-all`}>{header}</h5>
                <i className={`relative top-1 text-gray-700 transition-all text-xs ${active === id ? 'transform rotate-180 text-white' : ''}`}>V</i>
            </div>
            <div ref={contentEl} className={`relative h-0 overflow-hidden transition-height duration-300 ease-out ${active === id ? 'h-auto' : ''}`}>
                <div className="flex-1 min-h-0 py-4">
                    <p className='mb-0 text-base font-normal leading-6 text-blue-600'>{text}</p>
                </div>
            </div>
        </div>
    );
};

const Accordion: React.FC = () => {
    const [active, setActive] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        if (active === index) {
            setActive(null);
        } else {
            setActive(index);
        }
    }
    
    return (
        <div className="container-fluid mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 mt-2">
                    <div className="card">
                        <div className="card-body">
                          <h4 className="form-heading mb-4 text-primary text-center mt-3">React Accordion</h4>
                            {faqs.map((faq) => (
                                <AccordionItem key={faq.id} active={active} handleToggle={handleToggle} faq={faq} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accordion;

import React, { useRef, useEffect } from 'react';
const { tableau } = window;

const Tableau = () => {
    const ref = useRef(null)
    const url = "https://public.tableau.com/views/Grad_16225677211890/Sheet43";


    function initViz() {
        new tableau.Viz(ref.current, url);
    }

    useEffect(() => {
        initViz();
    }, [])

    return (
        <div>
            <h2>Hello</h2>
            <div ref={ref}></div>
        </div>
    )
}

export default Tableau

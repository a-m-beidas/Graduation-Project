import React, { useRef, useEffect } from 'react';
// import tableau from 'tableau-api';

const { tableau } = window;

const Tableau = () => {
    const ref = useRef(null)
    const url = "https://public.tableau.com/views/Grad_16225677211890/Dashboard2";


    function initViz() {
        new tableau.Viz(ref.current, url);
    }

    useEffect(() => {
        initViz();
    }, [])

    return (
        <>
            <div id="tableau" ref={ref} style={{ width: "800px", height: "300px" }}></div>
            {/* <script>
                document.getElementById("tableau").style.width = "300px";
                document.getElementById("tableau").style.height = "300px";
            </script> */}

        </>
    )
}

export default Tableau

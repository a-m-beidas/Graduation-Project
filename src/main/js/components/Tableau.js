import React, { useRef, useEffect } from 'react';
import tableau from "tableau-api";


const Tableau = () => {
    const ref = useRef(null)
    const url = "https://public.tableau.com/views/Grad_16225677211890/Dashboard2";
    let options = {}


    let viz = new window.tableau.Viz(ref.current, url, options);

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

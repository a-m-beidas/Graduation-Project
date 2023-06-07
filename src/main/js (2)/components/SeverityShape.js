import React from 'react';

const SeverityShape = ({ color, severityValue }) => {
    return (
        <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center', borderRadius: "50%",
            width: '72px',
            height: '72px',
            backgroundColor: color,
            margin: 'auto 3px',
        }}>

            {/* top: '50%', left: '50%',  flex: 'display', alignContent: 'center', */}
            <p style={{
                color: 'white', textAlign: 'center', font: 'normal normal 300 46px/62px Segoe UI',
            }}>{severityValue}</p>
        </div>
    )
}

export default SeverityShape

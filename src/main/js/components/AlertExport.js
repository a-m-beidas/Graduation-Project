import { useState } from 'react';

const AlertExport = (props) => {
    const [alert, setAlert] = useState(props.location.state.alert);
    return (
        <div>
            <h2>Alert</h2>
            <pre>{ JSON.stringify(alert, null, 2) }</pre>
        </div>
    )
}

export default AlertExport;
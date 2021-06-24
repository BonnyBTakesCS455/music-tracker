import React, { useState } from 'react'
import Toggle from '../components/Toggle'

function Settings(props) {
    const [checked, setChecked] = useState(false)

    return (
        <>
            <h1>The Settings page</h1>
            <label>
                <Toggle
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                />
                <span>Dark mode</span>
            </label>
            
        </>
    );
}

export default Settings;

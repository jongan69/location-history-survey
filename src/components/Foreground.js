import React from 'react';

function Foreground() {
    return (
        <div style={styles.main}>
        </div>
    )
}

const styles = {
    main: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1000',
        fontSize: '80px',
        pointerEvents: 'none'
    }
}

export default Foreground;
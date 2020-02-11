import React from 'react';
import mainStyles from './Main.module.scss';

export function Content() {
    return (
        <div>
            <div className={mainStyles.container}>
                <div className={mainStyles.wrapper}>
                    <div style={{ position: "relative" }}>
                        <h1>...</h1>
                    </div>
                </div>
            </div>            
        </div>
    )
}

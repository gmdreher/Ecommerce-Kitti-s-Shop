import React, { useState, useEffect } from 'react'
import './Theme.scss';


const ThemeChanger = () => {
    const [themeState, setThemeState] = useState(false);

    const handleChange = () => {
        setThemeState(!themeState);
        if (themeState) {
            localStorage.setItem('Theme', 'dark');
            document.body.classList.add('dark-mode');
        } else {
            localStorage.setItem('Theme', 'light');
            document.body.classList.remove('dark-mode');
        }
    }
    useEffect(() => {
        const getTheme = localStorage.getItem('Theme');
        if (getTheme === 'dark') return document.body.classList.add('dark-mode');
    })
    return (
        <div>
            <button className="theme" onClick={handleChange}>{themeState ? <i class="far fa-sun"></i> : <i class="fas fa-moon"></i>}</button>
        </div>
    )
}

export default ThemeChanger;
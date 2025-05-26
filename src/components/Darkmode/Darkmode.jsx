import React from "react";
// import { ReactComponent as Sun } from "../../assets/sun.svg";
// import { ReactComponent as Moon } from "../../assets/moon.svg";
import "./Darkmode.css";

const Darkmode = () => {
    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'Light');
        localStorage.setItem('theme', 'Light');
    }
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        setDarkMode();
    } else {
        setLightMode();
    }
    const toggleTheme = (e) => {

        if(e.target.checked) {
            setDarkMode();
        } else {
            setLightMode();
        }
    }
    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                defaultChecked={theme === 'dark' ? true : false}
            />
            <label className='dark_mode_label' for='darkmode-toggle'>
                <span className='dark_mode_icon dark_mode_icon_sun' style={{marginRight:'20px'}}></span>
                <span className='dark_mode_icon dark_mode_icon_moon'></span>   
            </label>
        </div>
    );
};

export default Darkmode;

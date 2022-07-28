import React from 'react';
import './App.scss';

function App() {
    return (
        <>
            <header>
                <h1>Gate changes</h1>
            </header>
            <main>
                <input
                    className="search"
                    placeholder="Search gate changes..."
                    type="text"
                />
            </main>
        </>
    );
}

export default App;

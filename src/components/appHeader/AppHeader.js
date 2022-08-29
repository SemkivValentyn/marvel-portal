import './appHeader.css';

const AppHeader = () => {
    return (
        <header>
            <div id="logo"> <span>Marvel</span> portal</div>
            <nav>
                <div className="dropdown">
                    <div className="dropdown-content">
                        <a href="#">Comics</a>
                        <a href="#">Characters</a>
                    </div>

                </div>
            </nav>
        </header>
    )
}

export default AppHeader;
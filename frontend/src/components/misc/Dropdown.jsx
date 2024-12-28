


const Dropdown = ({Child, DropdownTitle}) => {

    




    return (
        <div className="dropdown">
            <button className="dropbtn">{DropdownTitle}</button>
            <div className="dropdown-content">
                {Child}
            </div>
        </div>
    );
}

export default Dropdown;

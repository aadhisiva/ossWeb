import React from  'react';

const dropdownmenu = () => {
    return (
        <div className='flex flex-col dropdownmenu'>
            <ul className='flex flex-col gap-4'>
                <li>profile</li>
                    <li>settings</li>
                    <li> logout</li>
                
            </ul>
        </div>
    )
}

export default  dropdownmenu;
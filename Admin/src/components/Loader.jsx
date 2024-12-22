import React from 'react'
import { ProgressBar,ThreeDots } from 'react-loader-spinner';

function Loader() {
    return (
        <div>
            <ProgressBar
                visible={true}
                height="100vh"
                width="90"
                color="#000000"
                borderColor='#000000'
                barColor='#ffbc04'
                ariaLabel="Loading"
                wrapperStyle={{}}
                wrapperClass="d-flex justify-center items-center mx-auto " 
            />
            {/* <ThreeDots
                visible={true}
                height="100vh"
                width="90"
                color="#ffbc04"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass="d-flex justify-center items-center m-auto"
            /> */}
        </div>

    )
}

export default Loader;
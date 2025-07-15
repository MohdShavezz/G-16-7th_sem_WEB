import React from 'react'

const HomeChild = (props) => {
    let { count, incCount } = props;

    return (
        <>
            <div style={{ backgroundColor: 'yellow' }}>

                <div>
                    Hi there this is Home's Child component
                </div>
                <p>Count: {count}</p>
                <button onClick={incCount}>click</button>
            </div>
        </>
    )
}

export default HomeChild

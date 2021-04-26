import React from 'react'

const Redeem = () => {
    return (
        <div>  
            <div className='redeem'>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Paytm/UPI Id</th>
                    <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td data-column="Name">Johnny Depp</td>
                    <td data-column="Paytm/UPI Id">9987877666</td>
                    <td data-column="Amount">400</td>

                    </tr>
                    <tr>
                    <td data-column="Name">Tom Ellies</td>
                    <td data-column="Paytm/UPI Id">9974838473</td>
                    <td data-column="Amount">600</td>

                    </tr>
                    <tr>
                    <td data-column="Name">Ian Somerhalder</td>
                    <td data-column="Paytm/UPI Id">9987877666</td>
                    <td data-column="Amount">800</td>

                    </tr>
                    <tr>
                    <td data-column="Name">Chris Evans</td>
                    <td data-column="Paytm/UPI Id">9987899989</td>
                    <td data-column="Amount">300</td>

                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Redeem

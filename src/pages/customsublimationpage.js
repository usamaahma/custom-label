import React from 'react'
 import GoogleReviews from '../components/expressclothing/googlereviews';
import Sublimationhero from '../components/custom-sublimation/sublimationhero';
import SublimationTable from '../components/custom-sublimation/sublimationtable';
 

function Customsublimationpage() {
    return (
        <div>
            <Sublimationhero />
            <SublimationTable />
            <GoogleReviews />
        </div>
    )
}

export default Customsublimationpage;
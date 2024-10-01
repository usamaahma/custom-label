import React from 'react'
import Clothingcard from '../components/clothingsection/Clothingcard';
import Patchescard from '../components/clothingsection/Patchescard';
import Hangtags from '../components/clothingsection/Hangtags';
import Stockwoven from '../components/clothingsection/Stockwoven';

function Allclothingpage() {
  return (
    <div>
      <Clothingcard/>
      <Patchescard />
      <Hangtags/>
      <Stockwoven />
    </div>
  )
}

export default Allclothingpage;

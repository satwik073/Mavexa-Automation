
import { mapping } from './indexing'



const Navbar = () => {
  return (
    <div>
        
    {mapping.navs.map((index) => (
      <div key={index.name}>{index.name}</div>
    ))}
  </div>
  )  
}

export default Navbar
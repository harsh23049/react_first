import { useState , useCallback} from 'react'
import { use } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  const PasswordGenerator = useCallback(() => {
    // Password generation logic here
    let pass = "";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(charAllowed){
      str += "!@#$%^&*()_+";
    }
    if(numberAllowed){
      str += "0123456789"
    }

    for (let i = 1; i <= array.length; i++){
      let char = Math.floor(Math.random()*str.length +1)
      pass = str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 text-center'>Text</div>
    </>
  )
}

export default App

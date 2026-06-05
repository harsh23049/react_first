import { useEffect } from 'react';
import { useState , useCallback, useRef } from 'react'
import { use } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  const passwordref = useRef(null);

  // we have used callback hook to memoize the PasswordGenerator function, which generates a random password based on
  //  the specified length and allowed characters. The function constructs a string of possible characters based on 
  // the user's selections and then randomly selects characters to create the password, which is then stored in the 
  // state variable "Password".
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

    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random()*str.length +1)
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  
  //this function is used to copy the password to clipboard using the navigator.clipboard API. It selects the
  //  password input field, sets the selection range, and then writes the password text to the clipboard.
  const copyPassToClipboard = useCallback(() => {
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(Password);   // its function is to copy the password to clipboard using the
  }, [Password]);


  // The useEffect hook is used to call the PasswordGenerator function whenever there is a change in the dependencies 
  // (length, numberAllowed, charAllowed, PasswordGenerator). This ensures that a new password is generated whenever
  //  any of these dependencies change.
  useEffect(()=>{
    PasswordGenerator()
  },[length, numberAllowed, charAllowed, PasswordGenerator] )
  
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 text-center'>
      <h1 className='text-white text center my-3 background-color: #903'>Password Generator</h1>
      <div className='flex shflex shadow rounded-lg overflow-hidden mb-4 '>
        <input 
          type="text"
          value = {Password}
          readOnly
          className='outline-none w-full py-1 px-3 bg-blue-700 text-white'
          placeholder='password'
          ref={passwordref}
        />
        <button onClick={copyPassToClipboard}  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2
        px-4 border border-blue-700 rounded'>
          Copy
        </button>
      </div>
      
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1 my-3'>
          <input 
          type="range"
          min={8}
          max={100}
          value={length}
          onChange={(e) => setLength(e.target.value)} // It takes the new value from the event object (e.target.value) and sets it as the new length for the password.
          />
          <label>Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-2'>
          <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={()=>{
            setnumberAllowed((prev)=>!prev);
          }}
        />
        <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-2'>
          <input
          type="checkbox"
          defaultChecked={charAllowed}
          id='charInput'
          onChange={()=>{
            setcharAllowed((prev)=>!prev);
          }}
        />
        <label htmlFor="numberInput">characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App

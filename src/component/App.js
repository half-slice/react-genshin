import React ,{ Component,useEffect,useState }from "react";
import AppRouter from "component/Router";
import { authService } from "fbase";
import { ref } from "firebase/storage";
import { updateProfile } from "firebase/auth";

function App() {
  const [init,setInit] = useState(false);
  const [userObj,setUserObj] = useState(null);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  
  useEffect(()=>{
    authService.onAuthStateChanged((user) => {
       if(user){
        setIsLoggedIn(true);
        setUserObj({...user});
       }
       else{
        setIsLoggedIn(false);
       }
       setInit(true);
    });
  },[]);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({...user});
  }

  //아래 객체 물려주는거 isLoggedIn={Boolean(userObj)} 이렇게도 가능
  //이러면 굳이 isLoggedIn을 만들필요는 없다
  return (
    <>
      {init ? (
        <AppRouter 
          refreshUser={refreshUser} 
          userObj={userObj} 
          isLoggedIn={isLoggedIn}
        />
        ) : (
          "Initializing...."
        )
      }
      <footer>{new Date().getFullYear()}</footer>
    </>
  );
}

export default App;

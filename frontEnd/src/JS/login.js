let theToken = ""

//below is the signup methods
let theSignUp = document.querySelector(".signup")

theSignUp.addEventListener("click",(e)=>{
    e.preventDefault()
    signup()
})


function signup(){
    let theSignUp = document.createElement("div")
    theSignUp.classList = "recievers"
    theSignUp.innerHTML = `
        <div class="recieve-block">
        <div class="image__cont">
          <img src="src/image/eagle.jpg" alt="logo picture here">
      </div>
            <form>
            <div class="form-container">
                <div class="flex-horizon">
                <label for="fname">First Name: </label>
                <input id="fname" type="text" />
                </div>
                <div class="flex-horizon">
                <label for="lname">Last Name: </label>
                <input id="lname" type="text" />
                </div>
                <div class="flex-horizon">
                <label for="email2">email: </label>
                <input id="email2" type="email" />
                </div>
                <div class="flex-horizon">
                <label for="password2" >password: </label>
                <input id="password2" type="password" />
                </div>
                <div class="flex-horizon">
                <label for="conf-password" class="conf-pass" >confirm password: </label>
                <input id="conf-password" type="password" />
                </div>
                </div>
            </form>
            <div class="doesn-match done">your passwords do not match</div>
            <div class="but-cont">
            <button class="only-create" onclick="onlyCreate()">Create user</button>
            <button class="create-login" onclick="createLogin()">Create and login</button>
            </div>
        </div>
    `
        document.body.append(theSignUp)
}

function signUpPage(){
    let sign = document.querySelector(".sign-btn")  
    sign.addEventListener("click", (e)=>{
        e.preventDefault()
        let thetarget = document.querySelector(".recievers")
        thetarget.classList.remove("done")
        thetarget.style.display = "block"
        
    })
}

function onlyCreate(){
    signinUp("")
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function createLogin(){
    signinUp(true)
}

async function signinUp(login){
    let firstName = document.getElementById("fname").value
    let lastName = document.getElementById("lname").value
    let email = document.getElementById("email2").value
    let password = document.getElementById("password2").value
    let confPassword = document.getElementById("conf-password").value


    if(password === confPassword){
        const response = await fetch("http://localhost:3300/auth/signup",{
            method:"POST",
            body:JSON.stringify({
                firstName,
                lastName,
                email,
                password
            }),
            headers: { 
                'Content-Type': 'application/json', 
            } 
        })
    
        const data = await response.json()
        console.log(data.acces_token)
        if(data.acces_token){
            let thetarget = document.querySelector(".recievers")
            let doenMatch = document.querySelector(".doesn-match")
            doenMatch.innerText = login ? "Successfully created. Loggin in..." : "Succesfully Created you can login"
            theToken = login ? data.acces_token : ""
            sessionStorage.setItem("theToken",theToken)
            
            doenMatch.style.display = "block"
            doenMatch.style.color = login ? "green" : "blue"
            await sleep(1500)
            login ? window.open("src/home.html", "_self") : thetarget.classList.add("done")
    }if(data.message){
        let doenMatch = document.querySelector(".doesn-match")
            doenMatch.innerText = data.message
            doenMatch.style.color = "red"
    }

    }
    let doenMatch = document.querySelector(".doesn-match")
    doenMatch.style.display = "block"
}
//sugnup ends here



//below is signin functionality
const btn = document.getElementById("proceed")
btn.addEventListener("click",(e)=>{
    e.preventDefault()
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    signin(email,password)
})


async function signin(email,password){
    const response = await fetch("http://localhost:3300/auth/login",{
        method: 'POST', 
        body: JSON.stringify({ 
            email, 
            password 
        }), 
        headers: { 
            'Content-Type': 'application/json', 
        } 
    })
    const data = await response.json()
    if(data.acces_token){
        window.open("src/home.html", "_self")
        theToken = data.acces_token
        sessionStorage.setItem("theToken",theToken)
    }else{
        let wrong = document.querySelector(".wrong-cred")
        wrong.style.display = "block"
        wrong.style.color = "red"

    }
    
}


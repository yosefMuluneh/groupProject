let theToken = sessionStorage.getItem("theToken")
let page = document.body.id

window.addEventListener('DOMContentLoaded',()=>{
    switch(page){
        case 'favorite':
            getFavorites()
            downloadImg()
            searchThing()
            updateMyPro()
        default:
            downloadImg()    
            dblClkLike()
            sharePic()
            setClassOpac()
            likePicture()
            searchThing()
            updateMyPro()
    }
    
})

//logout functionality
function logout(){
    sessionStorage.setItem("theToken","")
    window.open("../index.html","_self")
}

let toLogout = document.querySelector(".logout")
toLogout.addEventListener("click",()=>{
    logout()
})


function showupd(){
    let theUpd = document.querySelector(".logout-update")
    console.log(theUpd)
    theUpd.classList.remove("done")
}
function hideup(){
    let theUpd = document.querySelector(".logout-update")
    theUpd.classList.add("done")
}
//logout ends



//below is like functionality
async function likePic(pathName){
    console.log(theToken)
    const response = await fetch("http://localhost:3300/user/like",{
        method:"POST",
        headers:{
           'Authorization':`Bearer ${theToken}`,
           'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            pathName,
            place:"Ethiopia",
            descr:"Lovely country",
            animals:"lion,cheetah,elephant"
        })
    })

    const data = await response.json()
    console.log(data)
}



function likePicture(){
    let likeBtn = document.querySelectorAll(".like-btn")
    likeBtn.forEach(btn=>{
        let theImgSrc = ''
        btn.addEventListener('click',()=>{
            if(btn.parentElement.previousElementSibling){
                theImgSrc = btn.parentElement.previousElementSibling.getAttribute("src")
                btn.classList.toggle("liked")
                let opa = btn.parentElement.style.opacity
                btn.parentElement.style.opacity =  opa ? "" : "1"
                likePic(theImgSrc)   
            }else{
                theImgSrc = btn.parentElement.firstElementChild.getAttribute("src")
                let opa = btn.parentElement.style.opacity
                likePic(theImgSrc)
                btn.classList.toggle("liked")
            }
            
        })
    })
}


    //below is like and unlike with double click
    const dblClkLike = () =>{
        let theImages = document.getElementsByTagName("img")
        theImages = Array.from(theImages)
        theImages.shift()
        theImages.shift()
        theImages.forEach(imag=>{
            imag.ondblclick = function(){
                likePic(imag.getAttribute('src'))
                if(imag.nextElementSibling.querySelector(".like-btn")){
                    imag.nextElementSibling.querySelector(".like-btn").classList.toggle("liked")
                    let opa = imag.nextElementSibling.style.opacity
                    imag.nextElementSibling.style.opacity = opa ? "" : "1"
                    imag.nextElementSibling.style.backgroundColor = "rgba(0,0,0,0.25)"
                }else{
                imag.nextElementSibling.nextElementSibling.classList.toggle("liked")
                let opa = imag.nextElementSibling.style.opacity
                    
            }
            }
            
        })
        
    }
    
    
    //below is gettin fav pics to identify class list and opacity
    async function checkWetherFav(){
        const response = await fetch("http://localhost:3300/user/favorites",{
            method:'get',
            headers:{
                'Authorization':`Bearer ${theToken}`,
                'Content-Type': 'application/json',
             },
        })
        const data = await response.json()
        return data.pics
    }


    async function setClassOpac(){
        const likedPics = await checkWetherFav()
        let theLest = []
        for(let i=0;i<likedPics.length;i++){
            theLest.push(likedPics[i].pathName)
        }

        
        let theImages = document.getElementsByTagName("img")
        theImages = Array.from(theImages)
        theImages.forEach(imag=>{
            if(theLest.includes(imag.getAttribute("src"))){
                if(imag.nextElementSibling.querySelector(".like-btn")){
                    imag.nextElementSibling.style.opacity = 1
                    imag.nextElementSibling.querySelector(".like-btn").classList.add("liked")
                }else if(imag.nextElementSibling.nextElementSibling){
                    imag.nextElementSibling.nextElementSibling.classList.add("liked")
                }
                imag.nextElementSibling.classList.add("liked")
            }else{
                console.log(theLest.includes(imag.getAttribute("src")))
                if(imag.nextElementSibling){
                    if(imag.nextElementSibling.querySelector(".like-btn")){
                        imag.nextElementSibling.querySelector(".like-btn").classList.remove("liked")    
                    }
                   
                }
            }
        })
    }



    //below is download functionality
    const downloadImg = ()=>{
        let downBtn = document.querySelectorAll('.save-btn')
        downBtn.forEach(btn=>{
            btn.addEventListener('click',(e)=>{
                let theImgSrc = ''
                e.preventDefault()
                if(btn.parentElement.previousElementSibling){
                    theImgSrc = btn.parentElement.previousElementSibling.getAttribute("src")
                }else{
                    theImgSrc = btn.parentElement.firstElementChild.getAttribute("src")
                }
                fetchUrl(theImgSrc)
            })
        })  
    }
    
    
    function fetchUrl(url){
        fetch(url).then(res=> res.blob()).then(picture=>{
            let tempUrl = URL.createObjectURL(picture)
            let thelink = document.createElement('a')
            thelink.href = tempUrl
            thelink.download = `filename${url}`
           document.body.appendChild(thelink)
            thelink.click()
            thelink.remove()
        })
    }
//download ends



//below is share functionality
async function sharePic(){
    
    let shareBtn = document.querySelectorAll(".share-btn")
    shareBtn.forEach(btn=>{
        let theImgSrc = ''
        btn.addEventListener('click',async ()=>{
            const people = await sharingPic()
            console.log(people)
            if(btn.parentElement.previousElementSibling){
                theImgSrc = btn.parentElement.previousElementSibling.getAttribute("src")
                
            }else{
                theImgSrc = btn.parentElement.firstElementChild.getAttribute("src")
            }
            let theRecieve = document.createElement('div')
            theRecieve.classList = "recievers"
            theRecieve.id = "recievers"
            theRecieve.innerHTML = `
            <div class="recieve-block">
                <ul>
                ${
                    people.map(res=>{
                        return `<li>
                        <div class="align">
                        <img src="./image/pp.png"/>
                        ${res.email}
                        </div>
                        <input type="checkbox"/>
                        </li>`
                    })
                }
                <div class="send-can">
                <button id="sent" onclick="hidereciver()" class="sent">send</button>
                <button class="cancelled" onclick="hidereciver()">cancel</button>
                </div>
                </ul>
                
                </div>
            `
            document.body.appendChild(theRecieve)
        })
    })  
}

async function sharingPic(){
    const response = await fetch("http://localhost:3300/user/share",{
        method:'get',
        headers: { 
            'Content-Type': 'application/json', 
            "Authorization":`Bearer ${theToken}`
        },
        
    })
    const data = await response.json()
    
    return data.users
}

 
function hidereciver(){
    let sentBox = document.getElementById("recievers")
    let theRecive = document.querySelector(".recieve-block")
    sentBox.remove()
    theRecive.remove()
}

const showSideMenu = ()=>{
    const theDiv = document.querySelector('.side-menus')
    theDiv.style.display = "block"
}
const hideMenus = () =>{
    const theDiv = document.querySelector('.side-menus')
    theDiv.style.display = "none"
}
//share ends here



//searching for picture 
function searchThing(){
    let searchKey = document.getElementsByTagName("input")
    searchKey = Array.from(searchKey)
    searchKey.forEach(keyPrs=>{
        keyPrs.addEventListener("keypress",async (e)=>{
            if(e.key === "Enter" && keyPrs.type === "search"){
                e.preventDefault()
                if(keyPrs.value){
                    const thePics = await searchPic(keyPrs.value)
                    createContent(thePics)   
                }
            }
        })
    })

}


function createContent(thePics){
    if(thePics.length > 0){
        console.log("got there")
        let thePopup = document.createElement("div")
        thePopup.classList = "search"
        thePopup.style.display = "grid"
        thePopup.style.color="black"
        thePopup.style.gap = "20px"
        let remove = document.createElement("button")
        remove.innerHTML = "<i class='fa fa-remove'>"
        remove.classList = "cancelled pos-rel"
        remove.addEventListener("click",()=>{
            console.log("heard")
            remove.parentElement.classList.add("done")
        })
        thePopup.appendChild(remove)
        thePopup.style.display.gridTemplateColumns = "1fr 1fr 1fr"
        for(let i=0;i<thePics.length;i++){
            let theElem = document.createElement("div")
            theElem.classList = "third-pic-btn"
            theElem.innerHTML = `
                <div class="mb-0">
                <img src=${thePics[i].pathName} alt=${thePics[i].id}/>
                <div class="third-btn-cont the-search">
                    <button class="save-btn"><i class="fa fa-download"></i></button>
                    <button class="share-btn"><i class="fa fa-share"></i></button>
                    <button class="like-btn"><i class="fa fa-heart"></i></button>
                </div>
                </div>
                <div class="detail-info">
                <p>${thePics[i].place}</p>
                <p>${thePics[i].animals ? thePics[i].animals : ""}</p>
                <p>${thePics[i].description}</p>
                </div>
                `
            thePopup.appendChild(theElem)   
        }
        
        document.body.appendChild(thePopup)


        //below the save/download code
        let theDwnld = document.querySelectorAll(".save-btn")
        theDwnld.forEach(btn=>{
          btn.addEventListener("click",()=>{
            let theImgSrc = ''
                  if(btn.parentElement.previousElementSibling){
                      theImgSrc = btn.parentElement.previousElementSibling.getAttribute("src")
                  }else{
                      theImgSrc = btn.parentElement.firstElementChild.getAttribute("src")
                  }
                  fetchUrl(theImgSrc)
          })
        })


        //below is like for searched item
        let likeButtons = document.querySelectorAll(".like-btn")
        likeButtons.forEach(btn=>{
        btn.addEventListener('click',()=>{
            if(btn.parentElement.previousElementSibling){
                theImgSrc = btn.parentElement.previousElementSibling.getAttribute("src")
                btn.classList.toggle("liked")
                let opa = btn.parentElement.style.opacity
                btn.parentElement.style.opacity =  opa ? "" : "1"
                likePic(theImgSrc) 
            }})
    })
        
    
        //below is the code to handle share in the favorite page
        let theShare = document.querySelectorAll(".share-btn")
        theShare.forEach(btn=>{
          btn.addEventListener("click",async ()=>{
            
            const people = await sharingPic()
              if(btn.parentElement.previousElementSibling){
                  theImgSrc = btn.parentElement.previousElementSibling.getAttribute("src") 
              }else{
                  theImgSrc = btn.parentElement.firstElementChild.getAttribute("src")    
              }
    
              let theRecieve = document.createElement('div')
              theRecieve.classList = "recievers"
              theRecieve.id = "recievers"
              theRecieve.innerHTML = `
              <div class="recieve-block">
                  <ul>
                  ${
                      people.map(res=>{
                          return `<li>
                          <img src="./image/pp.png"/>
                          ${res.email}
                          <input type="checkbox"/>
                          </li>`
                    }) 
                  }
              <div> 
              <div>
                  <button id="sent" onclick="hidereciver()" class="sent">send</button>
                  <button class="cancelled" onclick="hidereciver()">cancel</button>
                  </div>`
              document.body.appendChild(theRecieve)
                }   
            )}
            
        )
    }
    
}

async function searchPic(theString){
    const response = await fetch("http://localhost:3300/picture/searchPic",{
        method:"post",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({
            theString
        })
    })
    const data = await response.json()
    return data.searchPics
}
//search ends here



//below is update profile procedure
async function getME(){
    const me = await fetch("http://localhost:3300/user/me",{
        method: "get",
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${theToken}`
        }
    })

    const imHere = await me.json()
    return imHere
}

async function updateMyPro(){
        const prevInfo = await getME()
        let updatePop = document.createElement("div")
        updatePop.classList = "recievers done"
        updatePop.innerHTML = `
            <div class="recieve-block">
            <div class="image__cont">
              <img src="./src/image/eagle.jpg" alt="logo picture here">
          </div>
                <form>
                <div class="up-form">
                    <div class="flex-horizon">
                    <label for="fnameup">First Name: </label>
                    
                    <input id="fnameup" type="text" value=${prevInfo.firstName} />
                    </div>
                    <div class="flex-horizon">
                    <label for="lnameup">Last Name: </label>
                    <input id="lnameup" type="text" value=${prevInfo.lastName} />
                    </div>
                    <div class="flex-horizon">
                    <label for="emailup">Your email: </label>
                    <input id="emailup" type="email" value=${prevInfo.email} />
                    </div>
                    <div class="flex-horizon">
                    <label for="passwordup" >password: </label>
                    <input id="passwordup" type="password" />
                    </div>
                    
                    </div>
                </form>
                <div class="but-cont">
                <button class="only-create" onclick="updateIt()">Confirm</button>
                <button class="cancelled" onclick="cancel()">Cancel</button>
                </div>
            </div>
        `
            document.body.append(updatePop)
    }


    async function updateIt(){
        const prevInfo = await getME()
        console.log("before")
        const email = document.getElementById("emailup").value
        const firstName = document.getElementById("fnameup").value
        const lastName = document.getElementById("lnameup").value
        const password = document.getElementById("passwordup").value
        await fetch(`http://localhost:3300/user/update/${prevInfo.id}`,{
            method:"put",
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${theToken}`
            },
            body:JSON.stringify({
                firstName:firstName || prevInfo.fname,
                lastName:lastName || prevInfo.lName,
                email,
                hash:password
            })
        })
        let thetarget = document.querySelector(".recievers")
        thetarget.classList.add("done")

    }
    function cancel(){
        let thetarget = document.querySelector(".recievers")
        thetarget.classList.add("done")
    }

function doItUpd(){
    const updateTrig = document.getElementById("updat-pro")
    updateTrig.addEventListener("click",async ()=>{
        let thetarget = document.querySelector(".recievers")
        thetarget.classList.remove("done")
    })
}
//update ends here


//send feedback functionality

function sendFeed(){
    let theFeed = document.getElementById('feedback')
    let theSendBtn = document.getElementById('send-feed')
    let theSuccess = document.querySelector('.the-success')
    theSendBtn.addEventListener('click',()=>{
        
        if(theFeed.value){
            theSuccess.style.display = 'block'
            
        }else{
            theFeed.placeholder = 'please write your thought'
            
        }
    })
}




















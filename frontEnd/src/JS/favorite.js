theToken = sessionStorage.getItem("theToken")

async function getFavorites(){
    let theMainTag = document.getElementsByTagName("main")
    const response = await checkWetherFav()
    if (response.length === 0){
        theMainTag[0].style.height = "60vh"
        theMainTag[0].style.paddingTop = "15%"
        theMainTag[0].innerHTML = `
        <h2>
         You have no favorites yet. Go to other pages like the picture 
        <h2>
        `
    }else if(response.length === 1){
        let theLest = []
        for(let i=0;i<response.length;i++){
            theLest.push(response[i].pathName)
        }
        theMainTag[0].innerHTML = `
        <div class="first-pic-cont">
        <div>
        <img  class="first-pic" src=${theLest[0]} alt="nature picture 1">
        <div class="save-share">
          <button class="save-btn"><i class="fa fa-download"></i></button>
          <button class="share-btn"><i class="fa fa-share"></i></button>
        </div>
        <button class="like-btn" ><i class="fa fa-remove"></i></button>
      </div>
        </div>
        `
    }else if(response.length === 2){
        let theLest = []
        for(let i=0;i<response.length;i++){
            theLest.push(response[i].pathName)
        }

        
        theMainTag[0].innerHTML = `
        <div class="first-pic-cont">
        <div>
        <img  class="first-pic" src=${theLest[1]} alt="nature picture 1">
        <div class="save-share">
          <button class="save-btn"><i class="fa fa-download"></i></button>
          <button class="share-btn"><i class="fa fa-share"></i></button>
        </div>
        <button class="like-btn" ><i class="fa fa-remove"></i></button>
      </div>
        </div>

        <div class="first-pic-cont">
        <div>
        <img  class="first-pic" src=${theLest[0]} alt="nature picture 1">
        <div class="save-share">
          <button class="save-btn"><i class="fa fa-download"></i></button>
          <button class="share-btn"><i class="fa fa-share"></i></button>
        </div>
        <button class="like-btn" ><i class="fa fa-remove"></i></button>
      </div>
        </div>
        `
    }else{


      let theLest = []
        for(let i=0;i<response.length;i++){
            theLest.push(response[i].pathName)
        }
        let theElem = ``
        for(let i = theLest.length-2; i >= 0; i--){
          theElem += `
          <div class="third-pic-btn">
          <img src=${theLest[i]} alt="favorite-pic">
          <div class="third-btn-cont">
              <button class="save-btn" ><i class="fa fa-download"></i></button>
              <button class="share-btn"><i class="fa fa-share"></i></button>
              <button class="like-btn"><i class="fa fa-remove"></i></button>
          </div>
        </div>
        
        `
        theMainTag[0].innerHTML = `
        <div class="first-pic-cont">
        <div>
        <img  class="first-pic" src=${theLest[theLest.length-1]} alt="nature picture 1">
        <div class="save-share">
          <button class="save-btn"><i class="fa fa-download"></i></button>
          <button class="share-btn" ><i class="fa fa-share"></i></button>
        </div>
        <button class="like-btn"><i class="fa fa-remove"></i></button>
      </div>
        </div>
        
        <div class="third-pics-cont fav-sec-pic">
        
          ${theElem}
        </div>`
        }
    }

    if(response.length > 0 ){

      //below is remove liked func
      let theRemove = document.querySelectorAll(".like-btn")
      theRemove.forEach(btn=>{
        btn.style.color = "white"
        btn.addEventListener("click",async ()=>{
          if(btn.parentElement.previousElementSibling){
            theImgSrc = btn.parentElement.previousElementSibling.getAttribute("src")
            const theId = await getPicId(theImgSrc)
            await deletePic(theId)
            getFavorites()
            console.log(theImgSrc)
        }else{
            theImgSrc = btn.parentElement.firstElementChild.getAttribute("src") 
            const theId = await getPicId(theImgSrc)
            await deletePic(theId)
            getFavorites()
            console.log(theImgSrc)
        }
        })
      })

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

      //below is the code to handle share in the favorite page
      let theShare = document.querySelectorAll(".share-btn")
      theShare.forEach(btn=>{
        btn.addEventListener("click",async ()=>{
          console.log("coming")
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
          
      )}
      
    }


    async function getPicId(pathName){
      const response = await fetch("http://localhost:3300/user/getId",{
        method:"post",
        headers:{
          "Authorization" : `Bearer ${theToken}`,
          "Content-Type" : "application/json"
        },
        body:JSON.stringify({
          pathName
        })
      })

      const data = await response.json()
      return data.theId
    }

    async function deletePic(id){

      const response = await fetch(`http://localhost:3300/user/delete/${id}`,{
                method: "delete",
                headers : {
                  "Authorization" : `Bearer ${theToken}`,
                  "Content-Type" : "application/json"
                },
              })
    const data = await response.json()
    return data.pics
    }

    



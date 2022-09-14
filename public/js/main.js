
(function () {
  const form = document.querySelector('#form')
  const results = document.querySelector('#results')


const links = results.childNodes
  const existedLink = results.querySelector('.link')
  let currentUrl = []
  let count = 0
  form.addEventListener('submit', async (e)=> {
    // let allList = document.querySelectorAll('#results li')
    // let allListArr = Array.from(allList);
    // let parent = document.querySelector('#results');
   

    // if(allListArr.length>1) parent.removeChild(allListArr[allListArr.length-1]);
    e.preventDefault();

    const input =  document.querySelector('.input')
    const formData = new FormData(form);
    const entries = formData.entries();
    const data = Object.fromEntries(entries);
    const active = document.querySelector('.active')
   
    if (!currentUrl.includes(data.url)) {
      currentUrl.push(data.url)
      await removeThirdList()
      getLinksData(data.url)
      input.classList.remove('warning')
      
   
    

    }

    // else if( currentUrl.length>3 && !currentUrl.includes(data.url)) {
    //   const existedLinks = results.querySelectorAll('.originalLink')
    //   currentUrl.splice(0, 0, data.url)
    //   results.removeChild(results.firstChild)
    //   getLinksData(data.url)
    // }
   
  

   
  })

  async function removeThirdList () {
    if(results.childNodes[3] ) {
      results.childNodes[2].classList.add('goLeft') //left animation
      setTimeout(() => {
        results.removeChild(results.childNodes[3]) //remove from the ul #results
        results.childNodes[2].classList.remove('goLeft') //remove class
      }, "500")
      
    }
    // results.removeChild(results.childNodes[2])
  }
  function existedLinks() {
    const existedLinks = results.querySelector('.originalLink')
    if(existedLinks) return true
    else return false
  }
  
  async function getLinksData(url) {
        
    const response = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${url}`,
      {
        method: 'GET'
      
      }
    );
    if (!response.ok) {
     inputError()
    }
    else {
      document.querySelector("#error").innerText=''
      const res = await response.json();
      displayShortLink(res.result)
    } 
    
   
    
  }
  
  function displayShortLink(data) {
    const results = document.querySelector('#results')
    const container = document.createElement('li')
  
    if(container.nextElementSibling) container.nextElementSibling.classList.remove('first')
    const originalLink = document.createElement('span')
    originalLink.classList.add('originalLink')
    originalLink.innerText = data.original_link
    const shortLinkContainer = document.createElement('div')
    const shortLinkSpan = document.createElement('span')
    const shortLink = document.createElement('a')
    shortLink.href = 'http://' + data.short_link
    shortLink.target = '_blank';
    shortLink.innerText = data.short_link
    shortLinkSpan.appendChild(shortLink)
    const button = document.createElement('button')
    button.addEventListener('click', () => {
      button.innerText = 'Copied!'
      button.classList.add('copied')
      navigator.clipboard.writeText(shortLink.innerText)
    })
    button.classList.add('button')
    button.classList.add('copy')
    button.innerText = 'Copy'
    shortLinkContainer.appendChild(shortLinkSpan)
    shortLinkContainer.appendChild(button)
    container.appendChild(originalLink)
    container.appendChild(shortLinkContainer)
    results.prepend(container)
    setTimeout(function() {
   
      container.style.opacity = '1'
    }, 5);
    
  }
  
  function inputError() {
    const input =  document.querySelector('.input')
    input.classList.add('warning')
    document.querySelector("#error").innerText = 'Please add a valid link'
  }
  
    
})();

//burger menu
(function() {
const burger = document.querySelector('#burger')
const menu = document.querySelector('#mobileMenu')
burger.addEventListener('click', () => menu.classList.toggle('show'))
})()





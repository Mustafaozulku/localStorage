// const row = document.querySelector('.row')
const span = document.querySelector('#span')

console.log(urunler)

let sepet = []

let localItem = localStorage.getItem('sepet')



if(localItem){
    sepet = JSON.parse(localItem)
    // console.log(sepet)
    span.textContent = sepet.length
}
// localStorage.clear()
console.log(window.location.href)
console.log(sepet.length)
if(window.location.href == 'http://127.0.0.1:5500/index.html'){
    const row = document.querySelector('.row')
    urunler.forEach((urun) => {

    urun.quantity = 1

    const col = document.createElement('div')
    col.classList.add('col-lg-3', 'col-sm-6', 'col-12')

    const parentDiv = document.createElement('div')
    parentDiv.style.width = '100%'
    parentDiv.style.height = '220px'
    parentDiv.style.border = '1px solid black'

    const imgDiv = document.createElement('div')
    imgDiv.style.width ='100%'
    imgDiv.style.height ='100%'

    const img = document.createElement('img')
    img.src = urun.fotoğraf
    img.style.width ='100%'
    img.style.height = '100%'
    
    const cartBody = document.createElement('div')
    cartBody.style.width ='100%'
    cartBody.style.height ='120px'

    const baslik = document.createElement('div')
    baslik.textContent =urun.isim

    const aciklama = document.createElement('p')
    aciklama.textContent = `${urun.açıklama} - ${urun.fiyat}$`

    const btn = document.createElement('button')
    btn.classList.add('btn','btn-dark')
    btn.textContent = 'sepete ekle'
    btn.addEventListener('click', ()=> {
        sepet.push(urun)

        localStorage.setItem('sepet',JSON.stringify(sepet))
        span.textContent = sepet.length
        
    })

    cartBody.append(baslik)
    cartBody.append(aciklama)
    cartBody.append(btn)

    imgDiv.append(img)
    
    parentDiv.append(imgDiv)
    parentDiv.append(cartBody)

    col.append(parentDiv)

    row.append(col)
})
}else if (window.location.href =='http://127.0.0.1:5500/sepet.html'){
    const container = document.querySelector('.container')
    if(sepet.length ==0){
        const h4 = document.createElement('h4')
        h4.textContent = 'sepetinizde ürün yok'

        container.append(h4)
    }else{
        //! sepetimin uzunluğu 0 dan büyük olduğu sürece buradaki kodlar çalışacak
        sepet.forEach(urun =>{
            const div = document.createElement('div')
            div.style.width = '100%'
            div.style.height = '200px'
            div.style.border = '1px solid black'
            div.classList.add('d-flex','align-items-center','justify-content-between','mt-2')

            const imgDiv = document.createElement('div')
            imgDiv.style.width = '25%'
            imgDiv.style.height ='100%'

            const img = document.createElement('img')
            img.src = urun.fotoğraf
            img.style.width = '100%'
            img.style.height ='100%'

            const baslik = document.createElement('h3')
            baslik.textContent = urun.isim

            const price = document.createElement('p')
            price.textContent =urun.fiyat + '$'
            price.style.fontWeight ='bold'

            const kacTane = document.createElement('div')
            kacTane.classList.add('d-flex','gap-3')

            const sayi = document.createElement('p')
            sayi.textContent = urun.quantity
            sayi.classList.add('mt-3','mt-4')

            const azaltBtn = document.createElement('button')
            azaltBtn.textContent = '-'
            azaltBtn.classList.add('btn', 'btn-light')

            const arttırBtn = document.createElement('button')
            arttırBtn.textContent ='+'
            arttırBtn.classList.add('btn','btn-light')

            azaltBtn.addEventListener('click', function(){
               if(urun.quantity >=1){
                urun.quantity--
                sayi.textContent = urun.quantity
                if(urun.quantity ==0){
                    this.parentElement.parentElement.remove()
                    
                    //! localStorage dan silme
                    let urunIndex = sepet.indexOf(urun)
                    sepet.splice(urunIndex,1)
                    localStorage.setItem('sepet',JSON.stringify(sepet))
                    //! localStorage dan silme
                }
               }
            })
            arttırBtn.addEventListener('click',()=>{
                urun.quantity++
                sayi.textContent = urun.quantity
            })

            imgDiv.append(img)
            kacTane.append(azaltBtn)
            kacTane.append(sayi)
            kacTane.append(arttırBtn)

            div.append(imgDiv)
            div.append(baslik)
            div.append(price)
            div.append(kacTane)

            container.append(div)
        })
    }
}

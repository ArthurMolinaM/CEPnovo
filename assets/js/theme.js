const htmlElement = document.querySelector('html')
const btnTheme = document.querySelector('#btnTheme')


btnTheme.addEventListener('click', () =>{
    htmlElement.classList.toggle('dark');
})
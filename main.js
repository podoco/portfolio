'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    // console.log(window.scrollY)
    // console.log('navbarHeight:' +navbarHeight);
    if(window.scrollY>navbarHeight){
        navbar.classList.add('navbar--dark');
    } else{
        navbar.classList.remove('navbar--dark');
    }
})

//Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click',() =>{
    navbarMenu.classList.toggle('open');
}) 

// Handle scrolling when taping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) =>{
    const target = event.target;
    const link = target.dataset.link;
    if (link == null){
        return;
    }
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
})

//Handle click on 'contact me button on home
const contectbtn = document.querySelector('.home_contact');
contectbtn.addEventListener('click', (event)=>{
    scrollIntoView('#contact');
})



//Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () =>{

    home.style.opacity = 1 - window.scrollY / homeHeight;
})

//Show 'arrow up' button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll',()=>{
    if (window.scrollY >homeHeight /2){
        arrowUp.classList.add('visible');
    } else{
        arrowUp.classList.remove('visible')
    }
})
//Handle click on the "arrow up"button
arrowUp.addEventListener('click',(event)=>{
    scrollIntoView('#home');
})

//projects
const workBtnContainer = document.querySelector('.work_categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click',(e)=>{
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null){
        return;
    }


    //Remove selection from the previos item and select the new one
    const active = document.querySelector('.category_btn.selected');

    if (active != null) {
        active.classList.remove('selected');
    }
    e.target.classList.add('selected');
    

    projectContainer.classList.add('anim-out');  


    setTimeout(() =>{
        projects.forEach((project) =>{
            console.log(project.dataset.type);
            if(filter =='*' || filter == project.dataset.type){
                project.classList.remove('invisible');
            }else{
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    },300);
});


function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
}

//1.모든 섹션 요소들을 가지고온다
//2.intersectionObserver를 이용해서 섹션관찰
//3.보여지는 섹션에 해당하는 메뉴 아이템 활성화

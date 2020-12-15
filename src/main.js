
const init = () => {
    windows.addEventListener('hashchange', () => console.log(window.location.hash))
}

windows.addEventListener('load', init)
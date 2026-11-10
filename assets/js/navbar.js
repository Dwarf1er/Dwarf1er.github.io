// Overrides the theme's navbar.js: same open/close behaviour, plus aria-expanded,
// Escape to close, and focus handling for keyboard users.
const openToggleButton = document.querySelector(".open-dropdown-button")
const closeToggleButton = document.querySelector(".close-dropdown-button")
const dropdownMenu = document.querySelector(".dropdown-menu")
const footer = document.querySelector(".footer")

if (openToggleButton && dropdownMenu && closeToggleButton) {
    const setOpen = (open) => {
        dropdownMenu.classList.replace(open ? "max-lg:-top-full" : "max-lg:top-0", open ? "max-lg:top-0" : "max-lg:-top-full")
        closeToggleButton.classList.toggle("hidden", !open)
        openToggleButton.setAttribute("aria-expanded", String(open))
        closeToggleButton.setAttribute("aria-expanded", String(open))
        if (footer) footer.classList.toggle("hidden", open)
        ;(open ? closeToggleButton : openToggleButton).focus()
    }
    openToggleButton.setAttribute("aria-expanded", "false")
    openToggleButton.addEventListener("click", () => setOpen(true))
    closeToggleButton.addEventListener("click", () => setOpen(false))
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && dropdownMenu.classList.contains("max-lg:top-0")) setOpen(false)
    })
}

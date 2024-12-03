 const Modal = (() => {
 let modal = null;
    const createModal = () => {
        if (!modal){
            modal = document.createElement("div");
            modal.classList += "modal-container";
            modal.innerHTML = 
            `<div class="modal">
                <div class="modal-header">
                    <button class="close">X</button>
                </div>
                <div class="modal-content">
                </div>
            </div>`

            document.body.appendChild(modal);
            
            modal.querySelector(".close").addEventListener("click", closeModal);
            modal.addEventListener("click",  (event) => {
                if (event.target === modal){
                    closeModal();
                }
            });
        }

    }

    const showModal = (content) => {
        if (!modal) createModal();
        modal.querySelector(".modal-content").innerHTML = content;
        modal.style.display = "flex";

    }

    const closeModal = () => { 
        if (modal) modal.style.display = "none";
    }

    const destroyModal = () => {
        if (modal) {
            modal.remove();
            modal = null;
        }
    };
    
    return {showModal, closeModal, destroyModal};
})();

export default Modal